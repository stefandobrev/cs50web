from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("listings/create", views.create_listing, name="create_listing"),
    path("listings/my-watchlist", views.my_watchlist, name="my_watchlist"),
    path("listings/<int:pk>", views.show_listing, name="show_listing"),
    path("my-listings", views.my_listings, name="my_listings"),
    path("listings/<int:pk>/update-active", views.update_active_status, name="update_active_status"),
    path("listings/<int:pk>/submit-bid", views.submit_bid, name="submit_bid"),
    path("listings/<int:pk>/watchlist", views.add_to_watchlist, name="add_to_watchlist"),
    path("categories", views.categories, name="categories"),
    path("listings/<int:pk>/comments", views.manage_comments, name="manage_comments"),
    path('listing/<int:pk>/delete_comment/', views.delete_comment, name='delete_comment'),
]
