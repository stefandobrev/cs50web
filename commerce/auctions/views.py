from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from django import forms

from .models import User, AuctListing, Bids, Category, Comments


def index(request):
    listings = AuctListing.objects.filter(active=True).order_by('-create_time')
    return render(request, "auctions/index.html", {'listings': listings})


@login_required
def my_listings(request):
    """
    Page where a creator can see all his listings.
    """
    listings = AuctListing.objects.filter(created_by=request.user).order_by('-create_time')
    return render(request, "auctions/my_listings.html", {
        'listings': listings,
        'page_title': 'My Listings'
        })


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
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
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
            user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
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
        fields = ['title', 'price', 'description', 'photo_url', 'category']

@login_required
def create_listing(request):
    if request.method == "POST":
        form = ListingForm(request.POST)
        if form.is_valid():
            listing = form.save(commit=False)
            listing.created_by = request.user
            # Set default value to photo_url if no url is given
            if not listing.photo_url:
                listing.photo_url = "https://www.cagd.gov.gh/wp-content/themes/consultix/images/no-image-found-360x250.png"
            if not listing.category:
                listing.category = "No Category Listed"
            listing.save()
            messages.success(request, "Listing created succesfully!")
            return redirect('create_listing')
    else:
        form = ListingForm()
    return render(request, "auctions/create_listing.html", {'form': form})

def show_listing(request, pk):
    """
    Enter a particular listing's page.
    """
    listing = AuctListing.objects.get(pk=pk)
    highest_bid = Bids.objects.filter(bid_for=listing).order_by('-bid').first()
    is_highest_bidder = highest_bid and highest_bid.bid_by == request.user
    comments = Comments.objects.filter(commented_for=listing)

    user_comment_exists = comments.filter(commented_by=request.user).exists()

    is_in_watchlist = listing in request.user.watchlist.all()

    context = {
        'listing': listing,
        'highest_bid': highest_bid,
        'is_highest_bidder': is_highest_bidder,
        'is_in_watchlist': is_in_watchlist,
        'comments': comments,
        'user_comment_exists': user_comment_exists
    }
    return render(request, "auctions/listing.html", context)

def update_active_status(request, pk):
    listing = AuctListing.objects.get(pk=pk)
    highest_bid = Bids.objects.filter(bid_for=listing).order_by('-bid').first()

    if request.method == "POST":
        # Forbids the returning of active:yes because there is an auction winner.
        if highest_bid and not listing.active:
            messages.error(request, "You cannot reactivate the listing. It's sold!")
            return redirect('show_listing', pk)

        active_value = request.POST.get('active')
        listing.active = active_value == 'True'
        listing.save()

        # Listing is not active, there is an auction winner but URL is still accessible.
        if highest_bid and not listing.active:
            messages.success(request, "Auction is now closed!")
        # There was no bidder so far. Active status can be changed freely by the owner.
        else:
            status_message = "Yes" if listing.active else "No"
            messages.success(request, f"Listing active status updated to {status_message}!")

        return redirect('show_listing', pk)
    
    return render(request, "auctions/listing.html", {'listing': listing})

def submit_bid(request, pk):
    """
    Check the bid amount whether it matches the requirements to be saved or return
    error.
    """
    if request.method == "POST":
        bid_value = request.POST.get('bid')
        listing = AuctListing.objects.get(pk=pk)

        try:
            bid_value = float(bid_value)
            if bid_value <= 0: 
                messages.error(request, "Bid must be greater than 0!")
                return redirect('show_listing', pk)
            elif bid_value < listing.price:
                messages.error(request, "The bid must be greater or equal to the starting price!")
                return redirect('show_listing', pk)

            highest_bid = Bids.objects.filter(bid_for=listing).order_by('-bid').first()

            if highest_bid and bid_value <= highest_bid.bid:
                messages.error(request, "The bid must be greater than the current highest bid!")
                return redirect('show_listing', pk=pk)
            else:
                if listing.active:
                    Bids.objects.create(bid=bid_value, bid_by=request.user, bid_for=listing)
                    listing.number_bids += 1
                    listing.save()
                    messages.success(request, "Bid placed successfully!")
                else:
                    messages.error(request, "Auction closed!")
                    return redirect('show_listing', pk=pk)


        except ValueError:
            messages.error(request, "Please enter a valid bid amount.")
            return redirect('show_listing', pk=pk)
        
        return redirect('show_listing', pk=pk)
    
@login_required
def add_to_watchlist(request, pk):
    if request.method == "POST":
        listing = AuctListing.objects.get(pk=pk)
        user = request.user

        if listing in user.watchlist.all():
            user.watchlist.remove(listing)
            messages.success(request, "Removed from Watchlist!")
        else:
            user.watchlist.add(listing)
            messages.success(request, "Added to Watchlist!")

    return redirect('show_listing', pk)

@login_required
def my_watchlist(request):
    user = request.user

    listings = user.watchlist.all().order_by('-create_time')
    
    # Use the same template for my listings.
    return render(request, "auctions/my_listings.html", {
        'listings': listings,
        'page_title': 'My Watchlist'
        })

def categories(request):
    categories = Category.objects.all()
    if request.method == "POST":
        selected_category_ids = request.POST.getlist('categories')
        if selected_category_ids:
            listings = AuctListing.objects.filter(category__in=selected_category_ids)
        else:
            listings = AuctListing.objects.all()
        
        return render(request, "auctions/my_listings.html", {
                'listings': listings,
                'page_title': 'Filter by category'
                })
        
    return render(request, "auctions/categories.html", {'categories': categories})

@login_required
def manage_comments(request, pk):
    listing = AuctListing.objects.get(pk=pk)
    user = request.user

    existing_comment = Comments.objects.filter(commented_for=listing, commented_by=user).first()
    if request.method == "POST":
        comment_content = request.POST.get('comment')

        if existing_comment:
            existing_comment.content = comment_content
            existing_comment.save()

        else:
            if comment_content:
                comment = Comments(
                    commented_by = user,
                    commented_for = listing,
                    content=comment_content
                )
                comment.save()

    return redirect('show_listing', pk=pk)

@login_required
def delete_comment(request, pk):
    listing = AuctListing.objects.get(pk=pk)
    user = request.user

    # Find the comment to delete
    comment = Comments.objects.filter(commented_for=listing, commented_by=user).first()
    if comment:
        comment.delete()

    return redirect('show_listing', pk=pk)