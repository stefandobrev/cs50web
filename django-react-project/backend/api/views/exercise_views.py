from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

from ..controllers.exercise_controller import ExerciseController

@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_exercise(request):
    exercise_controller = ExerciseController()
    return exercise_controller.create(request)