from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import DecimalValidator, MinValueValidator, URLValidator
from django.utils import timezone

class User(AbstractUser):
    pass

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
    photo_url = models.URLField(validators=[URLValidator])
    create_time = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title