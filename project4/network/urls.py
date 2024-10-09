
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register, name="register"),

    # API routes
    # index
    path("posts/new/", views.new_post, name="new-post"),
    path("posts/", views.fetch_all_posts, name="fetch-all-posts"),

    # userpage
    path("user/<int:user_id>/", views.view_user, name="view-user"),
    path("user/<int:user_id>/data/", views.fetch_user_data, name="fetch-user-data"),
    path("user/<int:user_id>/posts/", views.fetch_user_posts, name="fetch-user-posts"),
    path("user/<int:user_id>/change-follow-status", views.change_follow_status, name="change-follow-status"),

    # following
    path("user/following/", views.following_page, name="following-page"),
    path("user/fetch-following-posts/", views.fetch_following_posts, name="fetch-following-posts"),
    path("user/<int:user_id>/follower-count/", views.fetch_followers_count, name="follower-count"),

    # edit
    path("edit-post/<int:post_id>/", views.edit_post, name="edit-post"),

    # like
    path("like-post/<int:post_id>/", views.like_post, name="like-post")
]
