
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API routes
    path("posts/new/", views.new_post, name="new-post"),
    path("posts/", views.get_posts, name="get-posts"),
    path("user/<int:user_id>/", views.view_user, name="view-user"),
    path("user/<int:user_id>/data/", views.fetch_user_data, name="fetch-user-data")
]
