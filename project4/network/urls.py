
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API routes
    path("new-post", views.new_post, name="new-post"),
    path("get-posts", views.get_posts, name="get-posts"),
]
