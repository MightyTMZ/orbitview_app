# projects/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Project, ProjectApplication
from .serializers import ProjectSerializer, ProjectApplicationSerializer
from services.ai_services import AIService

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    async def matched_projects(self, request):
        user = request.user
        user_skills = [skill.name for skill in user.skills.all()]
        
        projects = Project.objects.filter(status='open')
        matched_projects = []
        
        for project in projects:
            match_score = await AIService.calculate_skill_match(
                project.required_skills, user_skills)
            if match_score > 0.7:  # Minimum match threshold
                matched_projects.append({
                    'project': ProjectSerializer(project).data,
                    'match_score': match_score
                })
        
        return Response(matched_projects)