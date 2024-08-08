from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

from django import forms

from .models import User, AuctListing


def index(request):
    listings = AuctListing.objects.all().order_by('-create_time')
    return render(request, "auctions/index.html", {'listings': listings})


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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

class ListingForm(forms.ModelForm):
    """
    Default Django model form
    """
    class Meta:
        model = AuctListing
        fields = ['title', 'price', 'description', 'photo_url']

def create_listing(request):
    if request.method == "POST":
        form = ListingForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Listing created succesfully!")
            return redirect('create_listing')
    else:
        form = ListingForm()
    return render(request, "auctions/create_listing.html", {'form': form})

def show_listing(request, pk):
    listing = AuctListing.objects.get(pk=pk)
    return render(request, "auctions/listing.html", {'listing': listing})