from django.urls import path
from .views import PostListView
from .views import PostDetailView

urlpatterns = [
    path('', PostListView.as_view(), name='post-list-view'),
    path('<pk>/', PostDetailView.as_view(), name='post-detail-view'),
]