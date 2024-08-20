from django.contrib import admin

from .models import User, AuctListing, Bids, Category, Comments

# Register your models here.

admin.site.register(User)
admin.site.register(AuctListing)
admin.site.register(Bids)
admin.site.register(Category)
admin.site.register(Comments)