from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.conf import settings


class Post(models.Model):
    title = models.CharField(max_length=128)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images')
    description = models.TextField(max_length=512, default="")
    date_published = models.DateTimeField(default=timezone.now)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def get_absolute_image_url(self):
        return "{0}{1}".format(settings.MEDIA_ROOT, self.image.url)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField(max_length=512)
    date_published = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"user: {self.user} | post: {self.post} | comment:{self.comment}"
