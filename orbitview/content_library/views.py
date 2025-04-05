from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ContentItem, Question
from .serializers import ContentItemSerializer, QuestionSerializer
from .services.vector_store import VectorStore
from django.utils import timezone

class ContentItemViewSet(viewsets.ModelViewSet):
    serializer_class = ContentItemSerializer
    permission_classes = [IsAuthenticated]
    vector_store = VectorStore()

    def get_queryset(self):
        return ContentItem.objects.filter(user=self.request.user)

    async def perform_create(self, serializer):
        # Save content item
        content_item = serializer.save(user=self.request.user)
        
        # Process and vectorize content
        vector_id = await self.vector_store.process_content_item(content_item)
        content_item.vector_id = vector_id
        content_item.save()

    def perform_destroy(self, instance):
        # Delete vectors from Pinecone
        self.vector_store.delete_vectors(str(instance.id))
        instance.delete()

class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]
    vector_store = VectorStore()

    def get_queryset(self):
        return Question.objects.filter(
            target_user=self.request.user
        ) | Question.objects.filter(
            asker=self.request.user
        )

    @action(detail=False, methods=['post'])
    async def ask_question(self, request):
        target_user_id = request.data.get('target_user')
        question_text = request.data.get('question')

        # Search for relevant content
        relevant_content = await self.vector_store.search_relevant_content(
            question_text, target_user_id)

        # Create question
        question = Question.objects.create(
            asker=request.user,
            target_user_id=target_user_id,
            question=question_text
        )

        # Add relevant content
        content_ids = [match.metadata['content_id'] for match in relevant_content]
        relevant_items = ContentItem.objects.filter(id__in=content_ids)
        question.relevant_content.set(relevant_items)

        return Response(
            QuestionSerializer(question).data,
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['post'])
    def answer_question(self, request, pk=None):
        question = self.get_object()
        
        if question.target_user != request.user:
            return Response(
                {"error": "Not authorized to answer this question"}
                status=status.HTTP_403_FORBIDDEN
            )

        question.answer = request.data.get('answer')
        question.answered_at = timezone.now()
        question.save()

        return Response(QuestionSerializer(question).data)