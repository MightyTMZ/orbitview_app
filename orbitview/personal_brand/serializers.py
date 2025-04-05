from rest_framework import serializers
from .models import BrandStrategy, ContentSuggestion

class BrandStrategySerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandStrategy
        fields = '__all__'
        read_only_fields = ('last_updated',)

class ContentSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentSuggestion
        fields = '__all__'
        read_only_fields = ('created_at',)