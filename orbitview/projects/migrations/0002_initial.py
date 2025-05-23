# Generated by Django 5.1.7 on 2025-04-05 02:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('projects', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posted_projects', to='users.user'),
        ),
        migrations.AddField(
            model_name='projectapplication',
            name='applicant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_applications', to='users.user'),
        ),
        migrations.AddField(
            model_name='projectapplication',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='projects.project'),
        ),
    ]
