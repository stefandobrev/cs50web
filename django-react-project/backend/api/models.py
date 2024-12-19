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

    def __str__(self):
        return self.name


class Exercise(models.Model):
    title = models.CharField(max_length=100)
    primary_group = models.ForeignKey(
        MuscleGroup, related_name="primary_exercises", on_delete=models.CASCADE
    )
    secondary_group = models.ManyToManyField(
        MuscleGroup, related_name="secondary_exercises", blank=True
    )
    video_link = models.URLField(max_length=255, blank=True, null=True)
    gif_link_front = models.URLField(max_length=255, blank=True, null=True)
    gif_link_side = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title


class Step(models.Model):
    exercise = models.ForeignKey(
        Exercise, related_name="steps", on_delete=models.CASCADE
    )
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.description


class Mistake(models.Model):
    exercise = models.ForeignKey(
        Exercise, related_name="mistakes", on_delete=models.CASCADE
    )
    description = models.TextField()

    def __str__(self):
        return self.description
