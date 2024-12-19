from django.contrib import admin
from .models import User, MuscleGroup, Exercise, Step, Mistake

class UserAdmin(admin.ModelAdmin):
    ordering = ["username"]
    list_display = ["username", "first_name", "last_name", "is_active"]

class MuscleGroupAdmin(admin.ModelAdmin):
    ordering = ["name"]
    list_display = ["name", "slug"]

class ExerciseAdmin(admin.ModelAdmin):
    ordering = ["title"]
    list_display = ["title", "primary_group"]

admin.site.register(User, UserAdmin) 
admin.site.register(MuscleGroup, MuscleGroupAdmin)
admin.site.register(Exercise)
admin.site.register(Step)
admin.site.register(Mistake)
