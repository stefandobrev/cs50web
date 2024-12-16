from django.contrib import admin
from .models import User, MuscleGroup

class UserAdmin(admin.ModelAdmin):
    ordering = ['username']
    list_display = ['username', 'first_name', 'last_name', 'is_active']

class MuscleGroupAdmin(admin.ModelAdmin):
    ordering = ['name']
    list_display = ['name', 'slug']

admin.site.register(User, UserAdmin) 
admin.site.register(MuscleGroup, MuscleGroupAdmin)
