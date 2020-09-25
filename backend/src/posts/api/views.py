from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveAPIView
from posts.models import Post
from posts.api.serializers import PostSerializer

class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer