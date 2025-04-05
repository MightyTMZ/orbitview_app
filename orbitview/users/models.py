from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.postgres.indexes import GinIndex

class User(AbstractUser):
    ROLE_CHOICES = (
        ('individual', 'Individual'),
        ('employer', 'Employer'),
        ('admin', 'Admin'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='individual')
    headline = models.CharField(max_length=200, blank=True)
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True)
    vector_embedding = models.JSONField(null=True, blank=True)
    followers_count = models.IntegerField(default=0)
    connection_count = models.IntegerField(default=0)
    engagement_score = models.FloatField(default=0.0)

    def __str__(self):
        return self.email

class Experience(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='experiences')
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    skills = models.JSONField()
    achievements = models.JSONField()
    vector_embedding = models.JSONField(null=True)
    
    class Meta:
        indexes = [GinIndex(fields=['vector_embedding'])]

    def __str__(self):
        return f"{self.title} at {self.company}"

class Skill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField()
    endorsements = models.IntegerField(default=0)
    vector_embedding = models.JSONField(null=True)

    def __str__(self):
        return self.name

class Question(models.Model):
    asker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions_asked')
    answerer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions_received')
    question = models.TextField()
    answer = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    answered_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Q: {self.question[:50]}..."
