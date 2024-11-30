from django.urls import path
from .views import user_views


urlpatterns = [
    path("user/create-user/", user_views.create_user, name="create-user"), 
    path("user/login/", user_views.login_user, name="login-user"),
    path("user/profile/", user_views.your_profile, name="profile"),
    path("user/settings/", user_views.profile_settings, name="settings"),
    path("user/refresh-token/", user_views.refresh_token, name="refresh-token"),
]
