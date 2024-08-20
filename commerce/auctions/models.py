from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import DecimalValidator, MinValueValidator, URLValidator
from django.utils import timezone

class User(AbstractUser):
    watchlist = models.ManyToManyField('AuctListing', related_name="watchlisted_by", blank=True)

class AuctListing(models.Model):
    """
    Seting core values for the listing. Those need to be include in Listing
    Table in the db.
    """
    title = models.CharField(max_length=64)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[
            DecimalValidator(10, 2),
            MinValueValidator(0.00)
        ]
    )
    description = models.TextField(max_length=300)
    photo_url = models.URLField(validators=[URLValidator], blank=True)
    create_time = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    number_bids = models.IntegerField(default=0)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title
    
class Bids(models.Model):
    """
    Bid table should consist of offers made + connection to the user FK and the listing.
    """
    bid = models.DecimalField(max_digits=10, decimal_places=2)
    bid_by = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_for = models.ForeignKey(AuctListing, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.bid_for} for {self.bid} by {self.bid_by.username}" 
    
    class Meta:
        """
        Django sets all class names to plural.
        """
        verbose_name = "Bid"
        verbose_name_plural = "Bids"

class Category(models.Model):
    """
    Set a table with pre-defined category list.
    """
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name
    
    class Meta:
        """
        Django sets all class names to plural.
        """
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ['name']

class Comments(models.Model):
    commented_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    commented_for = models.ForeignKey(AuctListing, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.commented_by} left a comment for {self.commented_for}"
    
    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
        ordering = ['-created_at']