from django.urls import path
from .views import FollowPerson, UnfollowPerson

urlpatterns = [
    path('follow/', FollowPerson.as_view()),
    path('unfollow/', UnfollowPerson.as_view()),
]
