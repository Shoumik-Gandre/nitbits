from django.urls import path
from .views import (
    PostListView,
    PostDetailView,
    PostCreateView,
    PostUpdateView,
    PostDeleteView,
    PostByUserView,
    PostForProfileView,
    PostListViewTop,
    PostListViewHot,
    PostListViewNew,
    PostByUserView,
    CommentListView,
    CommentOnPostListView,
    CommentCreateView,
    CommentUpdateView,
    CommentDeleteView,
    PostUploadView,
    PostSearchView,
    PostVote,
    PostHomeView,
)


urlpatterns = [
    # Post Handling
    path('', PostListView.as_view()),
    path('<int:pk>/', PostDetailView.as_view()),
    path('create/', PostCreateView.as_view()),
    path('user/<str:user>/', PostByUserView.as_view()),
    path('userprofile/', PostForProfileView.as_view()),

    path('home/', PostHomeView.as_view()),

    path('sortby/top/', PostListViewTop.as_view()),
    path('sortby/hot/', PostListViewHot.as_view()),
    path('sortby/new/', PostListViewNew.as_view()),
    path('<int:pk>/update/', PostUpdateView.as_view()),
    path('<int:pk>/delete/', PostDeleteView.as_view()),
    path('vote/', PostVote.as_view()), # POST REQUEST ONLY WITH post_pk, vote
    path('<int:pk>/upload/', PostUploadView.as_view()),

    # Comment handling
    path('comments/', CommentListView.as_view()),  # all comments
    # Comments on a post
    path('<int:post>/comments/', CommentOnPostListView.as_view()),
    # Create Comment
    path('<int:post>/comments/create/', CommentCreateView.as_view()),
    # update comment
    path('comments/<int:pk>/update/', CommentUpdateView.as_view()),
    # delete comment
    path('comments/<int:pk>/delete/', CommentDeleteView.as_view()),
    # Search bar
    path('search/<str:search>/', PostSearchView.as_view()),
]
