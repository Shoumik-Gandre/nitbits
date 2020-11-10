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
from rest_framework import permissions
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


class ProfileInfoView(RetrieveAPIView):
    queryset = UserProfile
    serializer_class = ProfileInfoSerializer

class MyProfileInfoView(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        return Response(ProfileInfoSerializer(user.userprofile).data)
