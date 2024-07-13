from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<str:page_name>", views.page_view, name="page_view"), 
    path("search/", views.search_res, name="search_res"),
    path("create", views.create_page, name="create_page"),
    path("edit/<str:page_name>", views.edit_page, name="edit_page"),
    path("random/", views.random_page, name="random_page")
    ]
