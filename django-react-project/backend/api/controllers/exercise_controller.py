from rest_framework import status
from rest_framework.response import Response

from ..models import MuscleGroup
from ..serializers.exercise_serializers import ExerciseSerializer, MuscleGroupSerializer


class ExerciseController:
    """Controller handling all exercise-related operations."""

    def fetch_muscle_groups(self, request):
        """Return a response containing all muscle groups from the DB."""
        muscle_groups = MuscleGroup.objects.all().order_by("name")
        serializer = MuscleGroupSerializer(muscle_groups, many=True)
        return Response(serializer.data)

    def create(self, request):
        """
        Create a new exercise model.

        Args:
            request: HTTP request containing data

        Returns:
            Response with exercise data or error messages
        """
        serializer = ExerciseSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        exercise = serializer.save()
        return Response(
            {
                "message": "Exercise created successfully!",
                "exercise": {
                    "id": exercise.id,
                    "title": exercise.title,
                    "primary_group": exercise.primary_group,
                    "secondary_group": exercise.secondary_group,
                    "video_link": exercise.video_link,
                    "gif_link": exercise.gif_link,
                },
            }
        )
