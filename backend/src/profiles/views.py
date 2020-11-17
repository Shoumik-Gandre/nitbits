from rest_framework.views import (
    APIView,
)
from rest_framework.generics import (
    RetrieveAPIView,
)
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly
from .serializers import UserProfileSerializerFollows, ProfileInfoSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token


class FollowPerson(APIView):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    serializer_class = UserProfileSerializerFollows

    def get(self, request):
        print(request.user.auth_token)
        return Response({
            'follow': str(request.user.userprofile.follows.all()),
            'all_users': str(User.objects.all())
        })

    def post(self, request):
        request.user.userprofile.follow(request.POST['user'])
        return Response({'success': str(request.user.userprofile.follows.all())})


class UnfollowPerson(APIView):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    serializer_class = UserProfileSerializerFollows

    def get(self, request):
        print(request.user.auth_token)
        return Response({
            'get_request': str(request.user.userprofile.follows.all()),
            'all_users': str(User.objects.all())
        })

    def post(self, request):
        request.user.userprofile.unfollow(request.POST['user'])
        return Response({'success': str(request.user.userprofile.follows.all())})


class ProfileInfoView(APIView):
    queryset = UserProfile
    serializer_class = ProfileInfoSerializer
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    serializer_class = UserProfileSerializerFollows

    def get(self, request, *args, **kwargs):
        return Response(
            ProfileInfoSerializer(UserProfile.objects.get(user__username=self.kwargs['user'])).data, 
            status.HTTP_200_OK
        )

    
    def post(self, request, *args, **kwargs):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        return Response(
            ProfileInfoSerializer(UserProfile.objects.get(user__username=self.kwargs['user']), context={'user': user}).data, 
            status.HTTP_200_OK
        )



class MyProfileInfoView(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        return Response(ProfileInfoSerializer(user.userprofile).data)


class UserInfo(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)

    def post(self, request, *args, **kwargs):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        return Response({'username': user.username, 'image': 'http://127.0.0.1:8000' + user.userprofile.image.url}, status.HTTP_200_OK)


class UserFollows(APIView):
    
    def post(self, request, *args, **kwargs):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        return Response({'followers': user.follows})


class UserFollowers(APIView):
    
    def post(self, request, *args, **kwargs):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        return Response({'followers': user.userprofile.follows})