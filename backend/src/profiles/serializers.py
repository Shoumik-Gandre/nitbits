from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('pk', 'user', 'image', 'follows')


class UserProfileSerializerFollows(serializers.ModelSerializer):

    user = serializers.IntegerField()

    class Meta:
        model = UserProfile
        fields = ('pk', 'user')