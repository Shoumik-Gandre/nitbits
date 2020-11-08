from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator


class Post(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    image       = models.ImageField(upload_to='images')
    description = models.TextField(max_length=512, default="")
    timestamp   = models.DateTimeField(default=timezone.now)
    upvotes     = models.ManyToManyField(User, related_name='upvotes', blank=True)
    downvotes   = models.ManyToManyField(User, related_name='downvotes', blank=True)
    is_public   = models.BooleanField(default=False)

    def __str__(self):
        return self.description

    def get_absolute_image_url(self):
        return "{0}{1}".format(settings.MEDIA_ROOT, self.image.url)

    @property
    def get_votes(self):
        return (self.upvotes.count() - self.downvotes.count())
    
    def get_upvoted_posts(self, user):
        try: self.upvotes.get(User)
        except Exception: print('No upvotes')
    
    def get_downvoted_posts(self, user):
        try: self.upvotes.get(User)
        except Exception: print('No downvotes')

    def get_votecount(self):
        try: upvotes = self.likes.users.count()
        except: upvotes = 0
        try: downvotes = self.dislikes.users.count()
        except: downvotes = 0 
        return upvotes - downvotes


class Comment(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    post        = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment     = models.TextField(max_length=512)
    timestamp   = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"user: {self.user} | post: {self.post} | comment:{self.comment}"


# Testing Material::>
class Like(models.Model):
    ''' like  Post '''

    post        = models.OneToOneField(Post, related_name="likes", on_delete=models.CASCADE)
    users       = models.ManyToManyField(User)
    timestamp   = models.DateTimeField(auto_now_add=True)


class DisLike(models.Model):
    ''' Dislike  Post '''

    post        = models.OneToOneField(Post, related_name="dislikes", on_delete=models.CASCADE)
    users       = models.ManyToManyField(User)
    timestamp   = models.DateTimeField(auto_now_add=True)

class Vote(models.Model):
    ''' Vote on Post '''

    post        = models.OneToOneField(Post, related_name="vote", on_delete=models.CASCADE)
    users       = models.ManyToManyField(User, blank=True, related_name='vote')
    value       = models.IntegerField(default=0, validators=[MaxValueValidator(1), MinValueValidator(-1)])
    timestamp   = models.DateTimeField(auto_now_add=True)
