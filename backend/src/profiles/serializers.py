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
        
class ProfileInfoSerializer(serializers.ModelSerializer):

    num_follows = serializers.SerializerMethodField('num_follows_method')
    num_followers = serializers.SerializerMethodField('num_followers_method')
    num_posts = serializers.SerializerMethodField('num_posts_method')
    username = serializers.SerializerMethodField('username_method')
    class Meta:
        model = UserProfile
        fields = (
            'pk',
            'username',
            'image',
            'num_follows',
            'num_followers',
            'num_posts'
        )

    def num_follows_method(self, obj):
        return obj.follows.count()

    def num_followers_method(self, obj):
        return obj.user.follows.count()

    def num_posts_method(self, obj):
        return obj.user.post_set.count()

    def username_method(self, obj):
        return obj.user.username
