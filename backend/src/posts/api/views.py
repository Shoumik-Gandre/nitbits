from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)
from rest_framework.response import Response
from rest_framework.views import APIView
from posts.models import Post
from posts.api.serializers import PostSerializer

class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostCreateView(APIView):
    
    def get(self, request):
        return Response({'message': 'Get method for Post Create'})

    def post(self, request):
        content_image = request.POST['content-image']
        style_image = request.POST['style-image']
        final_image = None # final image will contain the NST image generated
        return Response({'message': 'Post method for Post Create'})
