from django.urls import path
from .views import (
    FollowPerson, 
    UnfollowPerson, 
    ProfileInfoView, 
    MyProfileInfoView, 
    UserInfo,
)

urlpatterns = [
    path('follow/', FollowPerson.as_view()),
    path('unfollow/', UnfollowPerson.as_view()),
    path('userprofile/', MyProfileInfoView.as_view()),
    path('userprofile/<str:user>/', ProfileInfoView.as_view()),
    path('getuser/', UserInfo.as_view()),
]
