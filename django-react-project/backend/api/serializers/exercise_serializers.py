from rest_framework import serializers
from ..models import Exercise, MuscleGroup


class ExerciseSerializer(serializers.ModelSerializer):
    """Serializer for Exercise registration."""

    class Meta:
        model = Exercise
        fields = [
            "title", 
            "primary_group", 
            "secondary_group", 
            "video_link", 
            "gif_link"
        ]

    def validate_title(self, value):
        """
        Validate the exercise registration data.

        Checks:
        - Title min length
        - Title contains only numbers and letters
        - Title uniqueness
        """
        if len(value) < 3:
            raise serializers.ValidationError(
                {"title": "Title must be at least 3 characters long."}
            )

        if not value.isalnum():
            raise serializers.ValidationError(
                {"title": "Title should only contain letters and numbers."}
            )

        if Exercise.objects.filter(title__iexact=value).exists():
            raise serializers.ValidationError(
                {"title": "An exercise with this title already exists."}
            )

        return value
    
class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ["name", "slug"]
