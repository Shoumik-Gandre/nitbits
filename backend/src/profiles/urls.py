from django.urls import path
from .views import FollowPerson, UnfollowPerson, ProfileInfoView, MyProfileInfoView

urlpatterns = [
    path('follow/', FollowPerson.as_view()),
    path('unfollow/', UnfollowPerson.as_view()),
    path('userprofile/', MyProfileInfoView.as_view()),
    path('userprofile/<int:pk>/', ProfileInfoView.as_view()),
]
