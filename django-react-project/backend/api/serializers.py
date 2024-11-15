from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from .models import User

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}  
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("Username already exists.")
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email already exists.")
        
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')       
        validated_data['password'] = make_password(validated_data['password'])
        
        user = User.objects.create(**validated_data)
        return user
    
class LoginSerializer(serializers.Serializer):
    login_username = serializers.CharField()
    login_password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['login_username'], password=data['login_password'])

        if user is None:
            raise serializers.ValidationError("Invalid username or password")
        
        return {"user": user}