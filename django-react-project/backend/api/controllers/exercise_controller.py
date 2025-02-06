from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ..models import Exercise, MuscleGroup, Step, Mistake
from ..serializers.exercise_serializers import ExerciseSerializer, MuscleGroupSerializer


class ExerciseController:
    """Controller handling all exercise-related operations."""

    def fetch_muscle_groups(self, request):
        """Return a response containing all muscle groups from the DB."""
        muscle_groups = MuscleGroup.objects.all().order_by("name")
        serializer = MuscleGroupSerializer(muscle_groups, many=True)
        return Response(serializer.data)
    
    def fetch_exercise_titles(self, request):
        """
        Return a response containing all exercise titles and information for filtering
        from the DB.
        """
        exercise_titles = Exercise.objects.values("id", "title", "created_at", "updated_at", "primary_group__name", "primary_group__slug").order_by("title")
        return Response(list(exercise_titles))
    
    def fetch_exercise(self, request, id):
        """Return a response containing an exercise's data from the DB."""
        try: 
            exercise = Exercise.objects.prefetch_related(
                "secondary_group", "steps", "mistakes"
                ).select_related("primary_group").get(id=id)
            
            exercise_data = {
                "id": exercise.id,
                "title": exercise.title,
                "primary_group": exercise.primary_group.slug,
                "secondary_group": [group.slug for group in exercise.secondary_group.all()],
                "gif_link_front": exercise.gif_link_front,
                "gif_link_side": exercise.gif_link_side,
                "video_link": exercise.video_link,
                "steps": [step.description for step in exercise.steps.all()],
                "mistakes": [mistake.description for mistake in exercise.mistakes.all()]
            }
            return Response(exercise_data)
        except Exercise.DoesNotExist:
            return Response({"error": "Exercise not found"}, status=status.HTTP_404_NOT_FOUND)

        

    def create(self, request):
        """
        Create a new exercise model(optional: add steps and mistakes to it)

        Args:
            request: HTTP request containing data

        Returns:
            Response with exercise, steps and mistakes data or error messages
        """
        exercise_data = {key: value for key, value in request.data.items() if key in ExerciseSerializer.Meta.fields }
        steps_data = request.data.get("steps", [])
        mistakes_data = request.data.get("mistakes", [])

        primary_group_name = exercise_data.get("primary_group")
        if primary_group_name:
            primary_group = MuscleGroup.objects.filter(slug=primary_group_name).first()
            if not primary_group:
                return Response({"primary_group": "Primary group not found."}, status=status.HTTP_400_BAD_REQUEST)
            exercise_data["primary_group"] = primary_group.id
        
        secondary_groups = []
        if "secondary_group" in exercise_data:
            for group_name in exercise_data["secondary_group"]:
                group = MuscleGroup.objects.filter(slug=group_name).first()
                if group:
                    secondary_groups.append(group.id)
            
            exercise_data["secondary_group"] = secondary_groups

        serializer = ExerciseSerializer(data=exercise_data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        exercise = serializer.save()

        for index, step_description in enumerate(steps_data, start=1):
            Step.objects.create(exercise=exercise, description=step_description, order=index)

        for mistake_description in mistakes_data:
            Mistake.objects.create(exercise=exercise, description=mistake_description)

        return Response({"message": "Exercise created successfully!"})

    def update(self, request, id):
        """ Update an existing exercise model (only provided fields)"""
        exercise = get_object_or_404(Exercise, id=id)

        exercise_data = {key: value for key, value in request.data.items() if key in ExerciseSerializer.Meta.fields}
        steps_data = request.data.get("steps")
        mistakes_data = request.data.get("mistakes")

        if "primary_group" in exercise_data: 
            primary_group_name = exercise_data["primary_group"]
            primary_group = MuscleGroup.objects.filter(slug=primary_group_name).first()
            if not primary_group:
                return Response({"primary_group": "Primary group not found."}, status=status.HTTP_400_BAD_REQUEST)
            exercise_data["primary_group"] = primary_group.id

        if "secondary_group" in exercise_data:
            secondary_groups = []
            for group_name in exercise_data["secondary_group"]:
                group = MuscleGroup.objects.filter(slug=group_name).first()
                if group:
                    secondary_groups.append(group.id)
            exercise_data["secondary_group"] = secondary_groups

        serializer = ExerciseSerializer(exercise, data=exercise_data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        exercise = serializer.save()

        if steps_data is not None:
            exercise.steps.all().delete()
            for index, step_description in enumerate(steps_data, start=1):
                Step.objects.create(exercise=exercise, description=step_description, order=index)
        
        if mistakes_data is not None:
            exercise.mistakes.all().delete()
            for mistake_description in mistakes_data:
                Mistake.objects.create(exercise=exercise, description=mistake_description)
        
        return Response({"message": "Exercise updated successfully!"})
    
    def delete(self, request, id):
        """ Delete an existing exercise model"""
        exercise = get_object_or_404(Exercise, id=id)
        exercise.delete()
        return Response({"message": "Exercise deleted successfully!"})