from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.response import Response
from ..serializers import UserSerializer, LoginSerializer


class UserController:
    def create(self, request):
        """
        Handle user registration.
        """
        serializer = UserSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        
        return Response({
            'message': 'User created successfully!',
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        }, status=status.HTTP_201_CREATED)

    
    def login(self, request):
        """
        Authenticate a user and return JWT tokens.
        """
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        return Response({
            'message': 'Successfull login',
            'username': user.username,
            'access': str(access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
    
    def refresh_token(self, request):
        """
        Generate a new access token using the refresh token.
        """
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try: 
            refresh = RefreshToken(refresh_token)
            access_token = refresh.access_token
            return Response({
                'message': 'Token refreshed successfully!',
                'access': str(access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)
        except TokenError:
            return Response({'error': 'Invalid or expired refresh token'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e: 
            return Response({'error': 'Internal Server Error'}, status=status.HTTP_400_BAD_REQUEST)