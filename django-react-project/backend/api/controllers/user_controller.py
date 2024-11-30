from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from ..serializers import UserSerializer, LoginSerializer, UserSettingsSerializer


class UserController:
    """Controller handling all user-related operations."""

    def create(self, request):
        """
        Create a new user account.
        
        Args:
            request: HTTP request containing user data
            
        Returns:
            Response with user data or error messages
        """
        try:
            serializer = UserSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user = serializer.save()
            return Response({
                'message': 'User created successfully!',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            }, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': 'Failed to create user'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def login(self, request):
        """
        Authenticate user and generate tokens.
        
        Args:
            request: HTTP request containing login credentials
            
        Returns:
            Response with tokens or error message
        """
        try:
            serializer = LoginSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            user = serializer.validated_data['user']
            tokens = self._generate_tokens(user)

            return Response({
                'message': 'Login successful',
                'username': user.username,
                **tokens
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': 'Login failed'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )

    def refresh_token(self, request):
        """
        Refresh access token using refresh token.
        
        Args:
            request: HTTP request containing refresh token
            
        Returns:
            Response with new tokens or error message
        """
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response(
                {'error': 'Refresh token is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            refresh = RefreshToken(refresh_token)
            tokens = {
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }
            
            return Response({
                'message': 'Token refreshed successfully',
                **tokens
            }, status=status.HTTP_200_OK)
        except TokenError:
            return Response(
                {'error': 'Invalid or expired refresh token'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response(
                {'error': 'Token refresh failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def handle_profile(self, request):
        """
        Handle profile operations (get/update).
        
        Args:
            request: HTTP request
            
        Returns:
            Response with profile data or error message
        """
        try:
            if request.method == 'GET':
                return self._get_profile(request.user)
            elif request.method == 'PUT':
                return self._update_profile(request.user, request.data)
        except Exception as e:
            return Response(
                {'error': 'Profile operation failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _generate_tokens(self, user):
        """Generate access and refresh tokens for user."""
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }

    def _get_profile(self, user):
        """Get user profile data."""
        return Response({
            'first_name': user.first_name,
            'last_name': user.last_name,
        })

    def _update_profile(self, user, data):
        """Update user profile data."""
        try:
            user.first_name = data.get('first_name', user.first_name)
            user.last_name = data.get('last_name', user.last_name)
            user.save()
            
            return Response({
                'first_name': user.first_name,
                'last_name': user.last_name,
            })
        except Exception as e:
            return Response(
                {'error': 'Failed to update profile'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    def handle_settings(self, request):
        """
        Handle settings operations (get/update).
        
        Args:
            request: HTTP request
            
        Returns:
            Response with settings data or error message
        """
        try:
            if request.method == 'GET':
                return self._get_settings(request.user)
            elif request.method == 'PUT':
                return self._update_settings(request.user, request.data)
        except Exception as e:
            return Response(
                {'error': 'Settings operation failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    def _get_settings(self, user):
        """Get user settings data."""
        return Response({
            'email': user.email,
            'username': user.username,
        })

    def _update_settings(self, user, data):
        """Update user settings data."""
        try:
            serializer = UserSettingsSerializer(user, data=data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user = serializer.save()
            return Response({
                'username': user.username,
                'email': user.email
            })
        except Exception as e:
            return Response(
                {'error': 'Failed to update settings'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )