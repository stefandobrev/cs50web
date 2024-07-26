from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import URLValidator, MinValueValidator
from django.core.exceptions import ValidationError


class User(AbstractUser):
    pass

class AuctListing(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField(max_length=300)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    photo_url = models.URLField(validators=[URLValidator()])
    #category = models.

    def __str__(self):
        return self.title
    
    def get_highest_bid(self):
        """return the highest bid for a particular listing by sorting"""
        return self.bids.order_by('-amount').first()

    
class Bids(models.Model):
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(AuctListing, on_delete=models.CASCADE, name="bids")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bid of ${{self.amount}} by {{self.user.username}} was made for {{self.listing.title}}"
    
    def clean(self):
        """Checks if the bid is higher than the current one"""
        highest_bid = self.listing.get_highest_bid()
        if highest_bid and self.amount <= highest_bid.amount:
            raise ValidationError("Bid must be higher than the current highest bid")

## TO DO
## auction listings
## bids
## comments on auct listings
