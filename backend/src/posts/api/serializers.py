from rest_framework import serializers
from ..models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('pk', 'title', 'user', 'image', 'description',
                  'date_published', 'upvotes', 'downvotes')


class PostSerializerHiddenUser(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('pk', 'title', 'description')


class ReturnCreatedURL(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('image')


class PostSerializerCreate(serializers.ModelSerializer):
    content_image = serializers.ImageField()
    style_image = serializers.ImageField()

    class Meta:
        model = Post
        fields = ('title', 'description', 'content_image', 'style_image')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('pk', 'user', 'post', 'comment')


class CommentSerializerUpdate(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('comment',)
