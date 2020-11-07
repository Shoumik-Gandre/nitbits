from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='userprofile')
    image = models.ImageField(upload_to='userProfile',
                              default='userProfile/default.png')
    follows = models.ManyToManyField(
        User, related_name='follows', symmetrical=False)

    def __str__(self):
        return str(self.pk) + str("   ") + str(self.user.username)

    def follow(self, user_to_follow: User) -> None:
        self.follows.add(user_to_follow)
        self.save()

    def unfollow(self, user_to_unfollow: User) -> None:
        self.follows.remove(user_to_unfollow)
        self.save()
