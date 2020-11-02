from rest_framework.views import (
    APIView,
)
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly
from .serializers import UserProfileSerializerFollows
from rest_framework.response import Response
from django.contrib.auth.models import User


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
