from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.core.validators import EmailValidator
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    
    confirm_password = serializers.CharField(write_only=True)
    email = serializers.EmailField(validators=[EmailValidator()])

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 8,
                'style': {'input_type': 'password'}
            },
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, data):
        """
        Validate the user registration data.
        
        Checks:
        - Passwords match
        - Username uniqueness
        - Email uniqueness
        """
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match."
            })
        
        # Username and email uniqueness checks
        if User.objects.filter(username=data['username'].lower()).exists():
            raise serializers.ValidationError({
                "username": "This username is already taken."
            })
        
        if User.objects.filter(email=data['email'].lower()).exists():
            raise serializers.ValidationError({
                "email": "This email is already registered."
            })
        
        return data
    
    def create(self, validated_data):
        """Create and return a new user."""
        # Remove confirm_password from the data
        validated_data.pop('confirm_password')
        
        # Hash the password
        validated_data['password'] = make_password(validated_data['password'])
        
        # Ensure username and email are lowercase
        validated_data['username'] = validated_data['username'].lower()
        validated_data['email'] = validated_data['email'].lower()
        
        return User.objects.create(**validated_data)
    
class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    
    login_username = serializers.CharField()
    login_password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )

    def validate(self, data):
        """
        Validate login credentials and return user if valid.
        
        Raises:
            ValidationError: If credentials are invalid
        """
        # Convert username to lowercase for consistency
        username = data['login_username'].lower()
        
        user = authenticate(
            username=username,
            password=data['login_password']
        )

        if not user:
            raise serializers.ValidationError({
                "non_field_errors": ["Invalid username or password"]
            })
        
        if not user.is_active:
            raise serializers.ValidationError({
                "non_field_errors": ["This account has been disabled"]
            })
        
        return {"user": user}

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile updates."""
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, data):
        """Validate profile update data."""
        if not data.get('first_name') and not data.get('last_name'):
            raise serializers.ValidationError({
                "non_field_errors": ["At least one field must be provided"]
            })
        return data
    

class UserSettingsSerializer(serializers.ModelSerializer):
    """Serializer for settings updates."""
    
    confirm_password = serializers.CharField(write_only=True)
    email = serializers.EmailField(validators=[EmailValidator()])

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 8,
                'style': {'input_type': 'password'}
            },
        }

    def validate(self, data):
        """
        Validate the user settings data.
        
        Checks:
        - Current password is correct
        - Passwords match
        - Username uniqueness (excluding current user)
        - Email uniqueness (excluding current user)
        """
        # Verify current password first
        if not self.instance.check_password(data['password']):
            raise serializers.ValidationError({
                "password": "Current password is incorrect."
            })
            
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match."
            })
        
        # Username and email uniqueness checks (excluding current user)
        if User.objects.exclude(pk=self.instance.pk).filter(username=data['username'].lower()).exists():
            raise serializers.ValidationError({
                "username": "This username is already taken."
            })
        
        if User.objects.exclude(pk=self.instance.pk).filter(email=data['email'].lower()).exists():
            raise serializers.ValidationError({
                "email": "This email is already registered."
            })
        
        return data

    def update(self, instance, validated_data):
        """Update and return the user settings."""
        # Remove password fields as they were only used for validation
        validated_data.pop('confirm_password')
        validated_data.pop('password')
        
        # Ensure username and email are lowercase
        validated_data['username'] = validated_data['username'].lower()
        validated_data['email'] = validated_data['email'].lower()
        
        # Update the instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        instance.save()
        return instance
