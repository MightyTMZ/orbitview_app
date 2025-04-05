from rest_framework import serializers
from .models import User, Experience, Skill, Question

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 
                 'role', 'headline', 'bio', 'avatar_url', 'followers_count', 
                 'connection_count', 'engagement_score')
        read_only_fields = ('id', 'followers_count', 'connection_count', 'engagement_score')

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
        read_only_fields = ('vector_embedding',)

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
        read_only_fields = ('vector_embedding', 'endorsements')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        read_only_fields = ('created_at', 'answered_at')


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'password', 'first_name', 
                 'last_name', 'role', 'headline', 'bio')

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 
                 'role', 'headline', 'bio', 'avatar_url', 'followers_count', 
                 'connection_count', 'engagement_score')
        read_only_fields = ('id', 'followers_count', 'connection_count', 
                          'engagement_score')