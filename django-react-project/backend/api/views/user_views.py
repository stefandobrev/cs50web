from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

from ..controllers.user_controller import UserController


@csrf_exempt
@api_view(['POST'])
def create_user(request):
    user_controller = UserController()
    return user_controller.create(request)

@csrf_exempt
@api_view(['POST'])
def login_user(request):
    user_controller = UserController()
    return user_controller.login(request)