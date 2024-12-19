from rest_framework import status
from rest_framework.response import Response

from ..serializers.exercise_serializers import ExerciseSerializer


class ExerciseController:
    """Controller handling all exercise-related operations."""

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
