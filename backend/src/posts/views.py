import datetime
from django.utils import timezone
from django.db.models import F
from django.conf import settings
from django.contrib.auth.models import User

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

from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token

from .models import (
    Post,
    Comment,
    Like,
    DisLike
)
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    PostSerializer,
    ProfilePostSerializer,
    PostSerializerHiddenUser,
    PostSerializerCreate,
    ReturnCreatedURL,
    CommentSerializer,
    CommentSerializerUpdate,
    PostUpdateSerializer
)

from PIL import Image
import os
from django.conf import settings
# Neural Style Transfer model:
try:
    if not settings.ENABLE_NST: raise ValueError('Just to skip massive reload time during testing')
    from .nst.nst import NST
    nst_exception = False
except Exception as e:
    print('nst exception')
    nst_exception = True


class PostListView(ListAPIView):
    queryset = Post.objects.filter(is_public=True)
    serializer_class = PostSerializer

    def get_serializer_context(self, *args, **kwargs):
        try: 
            user = Token.objects.get(key=(self.request.headers['Authorization'].split('Token ')[1])).user
        except Exception as e: 
            user = None
        print(self.serializer_class.context)
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'user': user
        }


class PostHomeView(APIView):

    def process_request(self, request, *args, **kwargs):
        user = Token.objects.get(key=(self.request.headers['Authorization'].split('Token ')[1])).user
        userlist = user.userprofile.follows.all()
        context = {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'user': user
        }
        postlist = []
        if user not in userlist:
            postlist.extend(PostSerializer(Post.objects.filter(user=user), many=True, context=context).data)
        for follow_user in userlist:
            postlist.extend(PostSerializer(Post.objects.filter(user=follow_user), many=True, context=context).data)

        return Response(postlist, status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        return self.process_request(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.process_request(request, *args, **kwargs)


class PostSearchView(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        query = self.kwargs['search']
        if query:
            postresult = Post.objects.filter(description__contains=query, is_public=True)
            result = postresult
        else:
            result = None
        return result

    def get_serializer_context(self, *args, **kwargs):
        try: 
            user = Token.objects.get(key=(self.request.headers['Authorization'].split('Token ')[1])).user
        except Exception as e: 
            user = None
        # print(self.serializer_class.context)
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'user': user
        }

# sort by :


class PostListViewHot(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        yesterday = timezone.now() - datetime.timedelta(days=1)
        return sorted(Post.objects.filter(timestamp__gte=yesterday, is_public=True) , key=lambda a: a.get_votes, reverse=True)

    def get_serializer_context(self, *args, **kwargs):
        try: user = Token.objects.get(key=self.request.headers['Authorization'].split('Token ')[1]).user
        except Exception as e: user = None
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'user': user
        }


class PostListViewNew(ListAPIView):
    queryset = Post.objects.filter(is_public=True).order_by('-timestamp')
    serializer_class = PostSerializer

    def get_serializer_context(self, *args, **kwargs):
        try: user = Token.objects.get(key=self.request.headers['Authorization'].split('Token ')[1]).user
        except Exception as e: user = None
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'user': user
        }


class PostListViewTop(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return sorted(Post.objects.filter(is_public=True), key=lambda a: a.get_votes, reverse=True)

    def get_serializer_context(self, *args, **kwargs):
        try: user = Token.objects.get(key=self.request.headers['Authorization'].split('Token ')[1]).user
        except Exception as e: user = None
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'user': user
        }

    def post(self, request, *args, **kwargs):
        return self.get(request, *args, **kwargs)


class PostByUserView(ListAPIView):
    """
    This gives us the Posts posted by a specific user
    Can be used in:
    - User Homepage
    """

    serializer_class = PostSerializer

    def get_queryset(self):
        # self.request.user = Token.objects.get(key=(self.request.headers['Authorization'].split('Token ')[1])).user
        return Post.objects.filter(user__username=self.kwargs['user'], is_public=True)

    def post(self, request, *args, **kwargs):
        return self.get(request, *args, **kwargs)


class PostForProfileView(ListAPIView):
    """
    This gives us the Posts posted by a specific user
    Can be used in:
    - User Homepage
    """
    serializer_class = ProfilePostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication, )

    def get_queryset(self):
        self.request.user = Token.objects.get(key=(self.request.headers['Authorization'].split('Token ')[1])).user
        return Post.objects.filter(user=self.request.user)


class PostDetailView(RetrieveAPIView):
    """
    Gets a specific Post by id
    """
    queryset = Post.objects.filter(is_public=True)
    serializer_class = PostSerializer


class PostDetailForProfile(RetrieveAPIView):
    """
    Gets a specific Post by id for current user
    """
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    

class ImageUploadParser(FileUploadParser):
    media_type = 'image/*'


class PostCreateView(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication, )
    parser_class = (ImageUploadParser,)
    serializer_class = PostSerializerCreate

    def post(self, request, format=None):
        try:
            if ('content_image' not in request.data) or ('style_image' not in request.data): raise ParseError("Empty content")
            _title = request.data['title']
            _user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
            _description = request.data['description']
            _content_image = request.data['content_image']
            _style_image = request.data['style_image']
            content_image = Image.open(_content_image).verify()
            style_image = Image.open(_style_image).verify()

            content_image = Image.open(_content_image)
            style_image = Image.open(_style_image)
            if not nst_exception: final_image = NST.run(content_image, style_image)
            else: final_image = _content_image

            p = Post(
                user=_user,
                image=final_image,  # replace with final image
                description=_description
            )
            p.save()
            #
            return Response({"pk": p.pk, "imagelink": p.image.url}, status=status.HTTP_201_CREATED)
        except ParseError:
            raise ParseError("Unsupported image type")
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PostUpdateDescriptionView(UpdateAPIView):
    """
    Post request to Update title and description of a post
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializerHiddenUser
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication, )


class PostUploadView(UpdateAPIView):
    """
    Used when post is to be made public or private
    """
    serializer_class = PostUpdateSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)
    queryset = Post.objects.all()


class PostUpdateView(UpdateAPIView):
    """
    Used when post is to be made public or private
    """
    serializer_class = PostUpdateSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)
    queryset = Post.objects.all()


class PostDeleteView(DestroyAPIView):
    """
    Delete Post by id if the user who posted it sent the request
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)


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


class CommentCreateView(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication, )

    def post(self, request, *args, **kwargs):
        try:
            self.request.user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
            post_pk = request.data['post_pk']
            comment_description = request.data['description']
            new_comment = Comment(
                user    = self.request.user,
                comment = comment_description
            )
            new_comment.post_id = post_pk
            new_comment.save()
            context = {
                'request': self.request,
                'format': self.format_kwarg,
                'view': self,
                'user': self.request.user
            }
            return Response(
                CommentSerializer(new_comment, context=context).data,
                status=status.HTTP_201_CREATED
            )
        except :
            return Response(
                {'action', 'comment not posted'},
                status=status.HTTP_400_BAD_REQUEST
            ) 


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
    authentication_classes = (TokenAuthentication,)


class PostVote(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def post(self, request):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        post_pk = int(request.data['post_pk'])
        vote = int(request.data['vote'])

        return self.votingRoutine(user, post_pk, vote)

    def votingRoutine(self, user: User, post_pk: int, vote: int) -> Response:
        try:
            post = Post.objects.get(pk=post_pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # check upvotes and downvotes for user
        if vote > 0:
            try: post.downvotes.remove(user)
            except Exception as e: return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            post.upvotes.add(user)
        elif vote < 0:
            try: post.upvotes.remove(user)
            except Exception as e: return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            post.downvotes.add(user)
        else:
            try: post.downvotes.remove(user)
            except Exception as e: return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            try: post.upvotes.remove(user)
            except Exception as e: return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        post.save()
        return Response(status=status.HTTP_200_OK)

