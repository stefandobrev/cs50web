import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse

from django.http import JsonResponse


from .models import User, Post


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

@login_required    
def new_post(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    
    try:
        dataPost = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)


    contentForm = dataPost.get("content", "")
    user = request.user

    post = Post(
        content = contentForm,
        created_by = user
    )
    post.save()

    return JsonResponse(post.serialize(), status=201)

def get_posts(request):
    posts = Post.objects.all().order_by("-timestamp")
    return JsonResponse([post.serialize() for post in posts], safe=False)

def view_user(request, user_id):
    # Render the user page
    user_to_view = get_object_or_404(User, pk=user_id)
    return render(request, "network/userpage.html", {"viewed_user": user_to_view})

def fetch_user_data(request, user_id):
    # Handle AJAX request to fetch user data
    user_to_view = get_object_or_404(User, pk=user_id)
    posts = Post.objects.filter(created_by=user_to_view).order_by("-timestamp")

    data = {
        "viewed_user": {
            "id": user_to_view.id,
            "username": user_to_view.username
        },
        "posts": [post.serialize() for post in posts]
    }

    return JsonResponse(data)