from rest_framework.views import (
    APIView,
)
from rest_framework.generics import (
    RetrieveAPIView,
    UpdateAPIView
)
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    UserProfileSerializerFollows, 
    ProfileInfoSerializer,
    ProfileFollowsSerializer,
    ProfileImageSerializer,
)
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
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        request.user.userprofile.follow(User.objects.get(username=request.data['user']).pk)
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
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        request.user.userprofile.unfollow(User.objects.get(username=request.data['user']).pk)
        return Response({'success': str(request.user.userprofile.follows.all())})


class FollowInsecureView(APIView):
    def post(self, request, *args, **kwargs):
        user1 = request.data['user1']
        user2 = request.data['user2']
        User.objects.get(username=user1).userprofile.follow(User.objects.get(username=user2).pk)
        return Response({'success': str(request.user.userprofile.follows.all())})


class UnfollowInsecureView(APIView):
    def post(self, request, *args, **kwargs):
        user1 = request.data['user1']
        user2 = request.data['user2']
        User.objects.get(username=user1).userprofile.unfollow(User.objects.get(username=user2).pk)
        return Response({'success': str(request.user.userprofile.follows.all())})


class FollowCheckView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user1 = User.objects.get(username=request.data['user1'])
            user2 = User.objects.get(username=request.data['user2'])
            return Response({'status': user2 in user1.userprofile.follows.all()}, status=status.HTTP_200_OK)
        except :
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ProfileInfoView(APIView):
    queryset = UserProfile
    serializer_class = ProfileInfoSerializer
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    serializer_class = UserProfileSerializerFollows

    def get(self, request, *args, **kwargs):
        context = {
                'request': self.request,
                'format': self.format_kwarg,
                'view': self,
                'user': self.kwargs['user']
            }
        return Response(
            ProfileInfoSerializer(UserProfile.objects.get(user__username=self.kwargs['user']), context=context).data, 
            status.HTTP_200_OK
        )

    
    def post(self, request, *args, **kwargs):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        context = {
                'request': self.request,
                'format': self.format_kwarg,
                'view': self,
                'user': user
        }
        return Response(
            ProfileInfoSerializer(UserProfile.objects.get(user__username=self.kwargs['user']), context=context).data, 
            status.HTTP_200_OK
        )



class MyProfileInfoView(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        context = {
                'request': self.request,
                'format': self.format_kwarg,
                'view': self,
                'user': user
        }
        return Response(ProfileInfoSerializer(user.userprofile, context=context).data)


class UserInfo(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)

    def post(self, request, *args, **kwargs):
        user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        return Response({'username': user.username, 'image': 'http://127.0.0.1:8000' + user.userprofile.image.url}, status.HTTP_200_OK)


class UserFollows(APIView):

    authentication_classes = (TokenAuthentication,)
    
    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(username=kwargs['user'])
            userfollows = list(user.username for user in user.userprofile.follows.all())
            return Response(userfollows, status.HTTP_200_OK)
        except Exception as e:
            return Response([], status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)

class UserFollowed(APIView):
    
    authentication_classes = (TokenAuthentication,)

    def post(self, request, *args, **kwargs):
        try:
            currentuser = User.objects.get(username=kwargs['user'])
            userfollowed = list(user.user.username for user in currentuser.follows.all())
            return Response(userfollowed, status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response([], status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)


class ProfileImageUpdateView(APIView):
    serializer_class = ProfileImageSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (TokenAuthentication,)

    def get(self, request, *args, **kwargs):
        return Response({'work': 'works'}, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        # user = Token.objects.get(key=(request.headers['Authorization'].split('Token ')[1])).user
        user = User.objects.get(pk=1)
        user.userprofile.image = request.data['image']
        user.save()
        return Response({'work': 'works'}, status=status.HTTP_200_OK)
