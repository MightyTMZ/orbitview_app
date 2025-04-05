# users/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User, Experience, Skill, Question
from .serializers import (UserSerializer, ExperienceSerializer, 
                        SkillSerializer, QuestionSerializer)
from services.ai_services import AIService

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    async def ask_question(self, request, pk=None):
        user = self.get_object()
        question_text = request.data.get('question')
        
        question = Question.objects.create(
            asker=request.user,
            answerer=user,
            question=question_text
        )
        
        return Response(QuestionSerializer(question).data, 
                       status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    async def answer_question(self, request, pk=None):
        question = Question.objects.get(id=pk)
        if question.answerer != request.user:
            return Response({"error": "Unauthorized"}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        question.answer = request.data.get('answer')
        question.save()
        
        return Response(QuestionSerializer(question).data)

class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user)

    async def perform_create(self, serializer):
        experience = serializer.save(user=self.request.user)
        # Generate and save embedding
        text = f"{experience.title} {experience.description}"
        embedding = await AIService.generate_embeddings(text)
        experience.vector_embedding = embedding
        experience.save()