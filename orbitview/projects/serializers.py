from rest_framework import serializers
from .models import Project, ProjectApplication

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('vector_embedding', 'created_at')

class ProjectApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectApplication
        fields = '__all__'
        read_only_fields = ('created_at', 'match_score')