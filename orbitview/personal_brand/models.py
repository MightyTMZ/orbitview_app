from django.db import models

class BrandStrategy(models.Model):
    user = models.OneToOneField('users.User', on_delete=models.CASCADE, related_name='brand_strategy')
    target_audience = models.JSONField()
    key_topics = models.JSONField()
    content_calendar = models.JSONField()
    growth_metrics = models.JSONField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Brand Strategy for {self.user.username}"

class ContentSuggestion(models.Model):
    TYPE_CHOICES = (
        ('post', 'LinkedIn Post'),
        ('article', 'Article'),
        ('project', 'Project Showcase'),
        ('achievement', 'Achievement'),
    )

    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='content_suggestions')
    content_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    title = models.CharField(max_length=200)
    content = models.TextField()
    suggested_hashtags = models.JSONField()
    ai_generated = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title