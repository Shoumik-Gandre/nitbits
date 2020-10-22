from django.urls import path
from .views import (
    PostListView,
    PostDetailView,
    PostCreateView,
    PostUpdateView,
    PostDeleteView,
    PostByUserView,
    PostListViewTop,
    PostListViewHot,
    PostListViewNew,
    CommentListView,
    CommentOnPostListView,
    CommentUpdateView,
    CommentDeleteView
)

urlpatterns = [
    # Post Handling
    path('', PostListView.as_view()),
    path('<int:pk>/', PostDetailView.as_view()),
    path('create/', PostCreateView.as_view()),
    path('user/<user>/', PostByUserView.as_view()),
    path('sortby/top/', PostListViewTop.as_view()),
    path('sortby/hot/', PostListViewHot.as_view()),
    path('sortby/new/', PostListViewNew.as_view()),
    path('<int:pk>/update/', PostUpdateView.as_view()),
    path('<int:pk>/delete/', PostDeleteView.as_view()),

    # Comment handling
    path('comments/', CommentListView.as_view()),  # all comments
    # Comments on a post
    path('<int:post>/comments/', CommentOnPostListView.as_view()),
    # update comment
    path('comments/<int:pk>/update/', CommentUpdateView.as_view()),
    # delete comment
    path('comments/<int:pk>/delete/', CommentDeleteView.as_view()),
]
