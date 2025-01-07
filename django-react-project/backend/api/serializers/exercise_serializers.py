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
            "gif_link_front",
            "gif_link_side",
            "video_link", 
        ]

    def validate(self, data):
        """
        Validate the exercise registration data.

        Checks:
        - Title min length
        - Title contains only numbers and letters
        - Title uniqueness
        - Gif links contain different urls
        """
        if len(data["title"]) < 3:
            raise serializers.ValidationError(
                {"title": "Title must be at least 3 characters long."}
            )

        if not data["title"].isalnum():
            raise serializers.ValidationError(
                {"title": "Title should only contain letters and numbers."}
            )

        if Exercise.objects.filter(title__iexact=data["title"]).exists():
            raise serializers.ValidationError(
                {"title": "An exercise with this title already exists."}
            )
        
        if data["gif_link_front"] == data["gif_link_side"]:
            raise serializers.ValidationError(
                {"gif links": "Gif links should be different"}
            )

        return data
    
class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ["name", "slug"]
