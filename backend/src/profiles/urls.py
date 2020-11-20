from django.urls import path
from .views import (
    FollowPerson, 
    UnfollowPerson, 
    ProfileInfoView, 
    MyProfileInfoView, 
    UserInfo,
    UserFollows,
    UserFollowed,
    ProfileImageUpdateView,
    FollowInsecureView,
    UnfollowInsecureView,
    FollowCheckView
)

urlpatterns = [
    path('follow/', FollowPerson.as_view()),
    path('unfollow/', UnfollowPerson.as_view()),
    path('newfollow/', FollowInsecureView.as_view()),
    path('newunfollow/', UnfollowInsecureView.as_view()),
    path('checkfollow/', FollowCheckView.as_view()),
    path('userprofile/', MyProfileInfoView.as_view()),
    path('userprofile/<str:user>/', ProfileInfoView.as_view()),
    path('getuser/', UserInfo.as_view()),
    path('userfollows/<str:user>/', UserFollows.as_view()),
    path('userfollowed/<str:user>/', UserFollowed.as_view()),
    path('<int:pk>/update-image/', ProfileImageUpdateView.as_view())
]
