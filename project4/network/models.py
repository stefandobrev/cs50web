from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    following = models.ManyToManyField(
        'self', 
        related_name="followers",
        symmetrical=False,
        blank=True
        )

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=280)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(
        User, 
        related_name="liked_posts",
        blank=True
        )

    def serialize(self, current_user):
        return {
            "id": self.id,
            "content": self.content,
            "created_by": self.created_by.username,
            "created_by_id": self.created_by.id,
            "timestamp": self.timestamp.strftime("%I:%M %p · %B %d, %y"),
            "likes": self.liked_by.count(),
            "liked": current_user in self.liked_by.all(),
            "can_edit": current_user == self.created_by,
            "can_like": current_user.is_authenticated and current_user != self.created_by
        }

    def __str__(self):
        content_preview = self.content[:20] + ('...' if len(self.content) > 20 else '')
        date_str = self.timestamp.strftime('%d-%m-%Y')
        time_str = self.timestamp.strftime('%H:%M')
        return f'{self.created_by.username} posted "{content_preview}" on {date_str} at {time_str}.' 