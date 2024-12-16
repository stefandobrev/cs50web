from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify


class User(AbstractUser):
    pass

class MuscleGroup(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(unique=True, blank=True)

    def save(self):
        if not self.slug:
           self.slug = slugify(self.name)
        super().save()

    def __str___(self):
        return self.name