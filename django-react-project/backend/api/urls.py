from django.urls import path
from .views import user_views, exercise_views


urlpatterns = [
    # user paths
    path("user/create-user/", user_views.create_user, name="create-user"),
    path("user/login/", user_views.login_user, name="login-user"),
    path("user/profile/", user_views.your_profile, name="profile"),
    path("user/settings/", user_views.profile_settings, name="settings"),
    path("user/refresh-token/", user_views.refresh_token, name="refresh-token"),
    path("user/blacklist-token/", user_views.blacklist_token, name="blacklist-token"),
    path("user/settings/password/", user_views.update_password, name="update-password"),

    # exercise paths
    path("exercises/fetch-muscle-groups/", exercise_views.fetch_muscle_groups, name="fetch-muscle-groups"),
    path("exercises/fetch-exercise-titles/", exercise_views.fetch_exercise_titles, name="fetch-exercise-titles"),
    path("exercises/fetch-exercise/<int:id>/", exercise_views.fetch_exercise, name="fetch-exercise"),
    path("exercises/create-exercise/", exercise_views.create_exercise, name="create-exercise"),
    path("exercises/update-exercise/<int:id>/", exercise_views.update_exercise, name="update-exercise"),
    path("exercises/delete-exercise/<int:id>/", exercise_views.delete_exercise, name="delete-exercise"),
]
