from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from ..controllers.exercise_controller import ExerciseController

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_muscle_groups(request):
    exercise_controller = ExerciseController()
    return exercise_controller.fetch_muscle_groups(request)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_exercise_titles(request):
    exercise_controller = ExerciseController()
    return exercise_controller.fetch_exercise_titles(request)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_exercise(request, id):
    exercise_controller = ExerciseController()
    return exercise_controller.fetch_exercise(request, id)

@api_view(["POST"])
# @permission_classes([IsAdminUser])
def create_exercise(request):
    exercise_controller = ExerciseController()
    return exercise_controller.create(request)

@api_view(["PUT"])
# @permission_classes([IsAdminUser])
def update_exercise(request, id):
    exercise_controller = ExerciseController()
    return exercise_controller.update(request, id)


@api_view(["DELETE"])
# @permission_classes([IsAdminUser])
def delete_exercise(request, id):
    exercise_controller = ExerciseController()
    return exercise_controller.delete(request, id)