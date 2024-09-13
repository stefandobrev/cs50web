from django.contrib.auth.models import AbstractUser
from django.db import models

from django.core.validators import MinValueValidator

from django.utils import timezone


class User(AbstractUser):
    id = models.AutoField(primary_key=True)

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField(max_length=280)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(
        default=0, 
        validators= [
            MinValueValidator(0)
    ])

    def __str__(self):
        content_preview = self.content[:20] + ('...' if len(self.content) > 20 else '')
        date_str = self.timestamp.strftime('%d-%m-%Y')
        time_str = self.timestamp.strftime('%H:%M')
        return f'{self.created_by.username} posted "{content_preview}" on {date_str} at {time_str}.' 