# Generated by Django 3.1.2 on 2020-11-07 14:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0007_auto_20201107_2018'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='votedown',
        ),
        migrations.RemoveField(
            model_name='post',
            name='voteup',
        ),
        migrations.AddField(
            model_name='post',
            name='downvote',
            field=models.ManyToManyField(blank=True, related_name='downvote', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='upvote',
            field=models.ManyToManyField(blank=True, related_name='upvote', to=settings.AUTH_USER_MODEL),
        ),
    ]
