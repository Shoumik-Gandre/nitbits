from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth.models import User
from profiles.models import UserProfile


class ProfileSerializer(serializers.ModelSerializer):
    follows = ""

    class Meta:
        model = UserProfile
        fields = ("image",)


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(source="userprofile", read_only=True)

    class Meta:
        model = User
        fields = ('pk', 'username', 'profile')


class CommentSerializer(serializers.ModelSerializer):
    owner = UserSerializer(source='user', read_only=True)

    class Meta:
        model = Comment
        fields = ('pk', 'owner', 'post', 'comment', 'timestamp')


class CommentSerializerUpdate(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('comment',)


class PostSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(
        source="comment_set", read_only=True, many=True)

    owner = UserSerializer(source="user", read_only=True)

    class Meta:
        model = Post
        fields = ('pk', 'owner', 'image', 'description',
                  'timestamp', 'get_votes', 'comments')

    def to_internal_value(self, data):
        print(data.upvotes)
        return True


class ProfilePostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(
        source="comment_set", read_only=True, many=True)

    owner = UserSerializer(source="user", read_only=True)

    class Meta:
        model = Post
        fields = ('pk', 'owner', 'image', 'description',
                  'timestamp', 'upvotes', 'downvotes', 'is_public', 'comments')


class PostSerializerHiddenUser(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('pk', 'description')


class ReturnCreatedURL(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('image',)


class PostSerializerCreate(serializers.ModelSerializer):
    content_image = serializers.ImageField()
    style_image = serializers.ImageField()

    class Meta:
        model = Post
        fields = ('description', 'content_image', 'style_image')


class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('description', 'is_public')
