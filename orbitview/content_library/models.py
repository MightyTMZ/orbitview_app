from django.db import models
from users.models import User
import uuid

class ContentItem(models.Model):
    CONTENT_TYPES = (
        ('experience', 'Work Experience'),
        ('project', 'Project'),
        ('document', 'Document'),
        ('template', 'Template'),
        ('achievement', 'Achievement'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='content_items')
    title = models.CharField(max_length=255)
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES)
    description = models.TextField()
    metadata = models.JSONField(default=dict)  # Store additional metadata
    file = models.FileField(upload_to='content_files/', null=True, blank=True)
    vector_id = models.CharField(max_length=100, unique=True)  # Pinecone vector ID
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.content_type}"

class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions_asked')
    target_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions_received')
    question = models.TextField()
    answer = models.TextField(null=True, blank=True)
    relevant_content = models.ManyToManyField(ContentItem, related_name='related_questions')
    created_at = models.DateTimeField(auto_now_add=True)
    answered_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Q: {self.question[:50]}..."