from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required

from ..models import User

from ..controllers.user_controller import UserController


@api_view(['POST'])
def create_user(request):
    user_controller = UserController()
    return user_controller.create(request)

@api_view(['POST'])
def login_user(request):
    user_controller = UserController()
    return user_controller.login(request)

@api_view(['GET', 'PUT'])
@login_required
def your_profile(request):
    current_user = request.user
    if request.method == 'GET':
        current_user_data = {
            'first_name': current_user.first_name,
            'last_name': current_user.last_name,
        }
        return Response(current_user_data)
    if request.method == 'PUT':
        data = request.data 
        current_user.first_name = data.get('first_name', current_user.first_name) 
        current_user.last_name = data.get('last_name', current_user.last_name) 
        current_user.save() 
        updated_user_data = { 
            'first_name': current_user.first_name, 
            'last_name': current_user.last_name, 
            } 
        return Response(updated_user_data)

@api_view(['POST'])
def refresh_token(request):
    user_controller = UserController()
    return user_controller.refresh_token(request)