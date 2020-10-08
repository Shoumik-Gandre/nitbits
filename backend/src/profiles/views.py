from rest_framework.views import (
    APIView,
)
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly
from .serializers import UserProfileSerializerFollows
from rest_framework.response import Response


class FollowPerson(APIView):
    permissions = (IsAuthenticated, IsOwnerOrReadOnly)
    serializer_class = UserProfileSerializerFollows

    def get(self, request):
        print(request.user.auth_token)
        return Response({
            'ok': 'OK',
        })

    def post(self, request):

        follows = dict(request.data)['follows']
        print(request.headers)
        print(type(follows), '\n', follows)
        return Response({'success': 'yeah success'})
