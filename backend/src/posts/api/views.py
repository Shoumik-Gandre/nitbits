import datetime
from django.utils import timezone
from django.db.models import F
from django.conf import settings
import traceback

from rest_framework.generics import (
    get_object_or_404,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.parsers import FileUploadParser
from rest_framework.exceptions import ParseError

from ..models import Post, Comment
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    PostSerializer,
    PostSerializerHiddenUser,
    PostSerializerCreate,
    ReturnCreatedURL,
    CommentSerializer,
    CommentSerializerUpdate
)

from PIL import Image
import os
# Neural Style Transfer model:
try:
    from ..nst.nst import NST
    nst_exception = False
except Exception as e:
    print('exception')
    nst_exception = True
from django.http import JsonResponse


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# sort by :


class PostListViewHot(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        yesterday = timezone.now() - datetime.timedelta(days=1)
        return (Post.objects.filter(date_published__gte=yesterday).order_by(F('downvotes') - F('upvotes')))


class PostListViewNew(ListAPIView):
    queryset = Post.objects.order_by('-date_published')
    serializer_class = PostSerializer


class PostListViewTop(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return (Post.objects.order_by(F('downvotes') - F('upvotes')))


class PostByUserView(ListAPIView):
    """
    This gives us the Posts posted by a specific user
    Can be used in:
    - User Homepage
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        _user = self.kwargs['user']
        return Post.objects.filter(user=_user)


class PostDetailView(RetrieveAPIView):
    """
    Gets a specific Post by id
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class ImageUploadParser(FileUploadParser):
    media_type = 'image/*'


class PostCreateView(APIView):
    permissions = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    parser_class = (ImageUploadParser,)
    serializer_class = PostSerializerCreate

    def post(self, request, format=None):
        if ('content_image' not in request.data) or ('style_image' not in request.data):
            raise ParseError("Empty content")
        _title = request.data['title']
        _user = request.user
        _description = request.data['description']
        _content_image = request.data['content_image']
        _style_image = request.data['style_image']
        # final_image = None  # final image will contain the NST image generated
        try:
            content_image = Image.open(_content_image).verify()
            style_image = Image.open(_style_image).verify()

            content_image = Image.open(_content_image)
            style_image = Image.open(_style_image)
            if not nst_exception:
                final_image = NST.run(content_image, style_image)
            else:
                final_image = _content_image

            p = Post(
                title=_title,
                user=_user,
                image=final_image,  # replace with final image
                description=_description
            )
            p.save()
            #
            return Response({"imagelink": p.image.url}, status=status.HTTP_201_CREATED)
        except ParseError:
            raise ParseError("Unsupported image type")
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PostUpdateView(UpdateAPIView):
    """
    Post request to Update title and description of a post
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializerHiddenUser
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)


class PostDeleteView(DestroyAPIView):
    """
    Delete Post by id if the user who posted it sent the request
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)


class CommentListView(ListAPIView):
    """
    This gives us all Comments
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentOnPostListView(ListAPIView):
    """
    This gives us comments according to post
    """
    serializer_class = CommentSerializer

    def get_queryset(self):
        post = self.kwargs['post']
        return Comment.objects.filter(post=post)


class CommentUpdateView(UpdateAPIView):
    """
    Post request to Update title and description of a post
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializerUpdate
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)


class CommentDeleteView(DestroyAPIView):
    """
    Delete Post by id if the user who posted it sent the request
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
