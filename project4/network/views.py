import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.core.paginator import Paginator

from django.http import JsonResponse

from django.core.exceptions import ValidationError

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
    if not contentForm:
        return JsonResponse({"error": "Content is required."}, status=400)
    
    user = request.user

    post = Post(
        content = contentForm,
        created_by = user
    )

    try:
        post.full_clean()  
        post.save()
    except ValidationError:
        return JsonResponse({"error": "The texts should be below 280 chars"}, status=400)

    return JsonResponse(post.serialize(request.user), status=201)

@login_required
@require_http_methods(["PUT"])
def edit_post(request, post_id):
    post = get_object_or_404(Post, pk=post_id)

    if request.user != post.created_by:
        return JsonResponse({'error': 'Unauthorised'}, status=403)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    
    new_content = data.get('content')
    if not new_content:
        return JsonResponse({'error': 'Content is required!'}, status=400)
    
    post.content = new_content
    post.save()

    post.refresh_from_db()

    return JsonResponse({'content': post.content}, status=200)

def view_user(request, user_id):
    # Render the user page
    user_to_view = get_object_or_404(User, pk=user_id)

    logged_in = request.user.is_authenticated
    ## check if the logged user is the same as the profile it visits
    if logged_in:
        different_user = request.user != user_to_view
        is_followed = user_to_view in request.user.following.all()
    else:
        different_user = False
        is_followed = False

    context = {
        "viewed_user": user_to_view,
        "logged_in": logged_in,
        "different_user": different_user,
        "is_followed": is_followed
    }

    return render(request, "network/userpage.html", context)

def fetch_user_data(request, user_id):
    # Handle AJAX request to fetch user data
    user_to_view = get_object_or_404(User, pk=user_id)
   
    data = {
        "id": user_to_view.id,
        "username": user_to_view.username,
        "date_joined": user_to_view.date_joined.strftime("%B %Y"),
        "following_count": user_to_view.following.count(),
        "followers_count": user_to_view.followers.count()
    }

    return JsonResponse(data)

@login_required
def change_follow_status(request, user_id):
    if request.method == "POST":
        viewed_user = User.objects.get(pk=user_id)
        user = request.user

        if viewed_user in user.following.all():
            user.following.remove(viewed_user)
        else:
            user.following.add(viewed_user)

    return redirect('view-user', user_id=user_id)

def fetch_followers_count(request, user_id):
    user_to_view = get_object_or_404(User, pk=user_id)

    data = {
        "following_count": user_to_view.following.count(),
        "followers_count": user_to_view.followers.count()
    }

    return JsonResponse(data)

@login_required
def following_page(request):
    return render(request, "network/following.html")

def fetch_all_posts(request):
    posts = Post.objects.all().order_by("-timestamp")
    
    return handle_posts_request(request, posts)

def fetch_user_posts(request, user_id):
    posts = Post.objects.filter(created_by=user_id).order_by("-timestamp")
    
    return handle_posts_request(request, posts)

@login_required
def fetch_following_posts(request):
    followed_users_ids = list(request.user.following.values_list("id", flat=True))
    posts = Post.objects.filter(created_by_id__in=followed_users_ids).order_by("-timestamp")
    
    return handle_posts_request(request, posts)

def handle_posts_request(request, posts):
    data_paginator, page_obj = paginator(request, posts)
    paginated_posts = page_obj.object_list

    data = {
        "posts": [post.serialize(request.user) for post in paginated_posts],
        "data_paginator": data_paginator
    }

    return JsonResponse(data)

def paginator(request, items):
    paginator = Paginator(items, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    data_paginator = {
        "has_next": page_obj.has_next(),
        "has_previous": page_obj.has_previous(),
        "num_pages": paginator.num_pages,
        "current_page": page_obj.number,
        "show_pagination": paginator.num_pages > 1
    }
    
    return data_paginator, page_obj

@login_required
def like_post(request, post_id):
    if request.method == 'PUT':
        post = Post.objects.get(pk=post_id)
        user = request.user

        if not user.is_authenticated:
            return JsonResponse({"error": "You must be logged in to like posts"}, status=401)
        
        if user in post.liked_by.all():
            post.liked_by.remove(user)
            liked = False
        else:
            post.liked_by.add(user)
            liked = True

        post.save()

        like_data = {
            "liked": liked,
            "likes": post.liked_by.count()
        }

        return JsonResponse(like_data)

    return JsonResponse({"error": "Invalid request method"}, status=400)