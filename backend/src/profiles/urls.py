from django.urls import path
from .views import FollowPerson

urlpatterns = [
    path('', FollowPerson.as_view()),
]
