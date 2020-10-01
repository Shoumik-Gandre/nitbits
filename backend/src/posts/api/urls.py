from django.urls import path
from .views import (
    PostListView,
    PostDetailView,
    PostCreateView
)

urlpatterns = [
    path('', PostListView.as_view(), name='post-list-view'),
    path('<pk>/', PostDetailView.as_view(), name='post-detail-view'),
    path('create/', PostListView.as_view(), name='post-create-view'),
]