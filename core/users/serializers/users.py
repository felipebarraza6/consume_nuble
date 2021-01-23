
# Django
from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator

# Models
from core.users.models import User, Profile
from core.commerce.models import Order
from rest_framework.authtoken.models import Token

# DRF
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


# Serializers
from .profiles import ProfileModelSerializer

from core.commerce.serializers import ListOrderSerializer


class UserModelSerializer(serializers.ModelSerializer):

    profile = ProfileModelSerializer(read_only=True)
    orders = serializers.SerializerMethodField('get_orders')

    def get_orders(self, user):
        qs = Order.objects.filter(client=user, is_active=True)    
        serializer =  ListOrderSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model=User
        fields = (
            'id',
            'username', 
            'email',
            'phone_number',
            'profile',
            'orders' 
            )


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, max_length=64)

    def validate(self,data):
        user = authenticate(username=data['email'], password=data['password'])

        if not user:
            raise serializers.ValidationError('Invalid credentials')

        self.context['user'] = user
        return data
    
    def create(self, data):
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class UserSignUpSerializer(serializers.Serializer):

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    username = serializers.CharField(
        min_length=4,
        max_length=20,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
		message="Phone number must be entered in the format: +9999999. Up to 15 digits allowed."
    )

    phone_number = serializers.CharField(validators=[phone_regex])

    # Password	
    password = serializers.CharField(min_length=8, max_length=64)
    password_confirmation = serializers.CharField(min_length=8, max_length=64)


    def validate(self, data):
        passwd = data['password']
        passwd_conf = data['password_confirmation']
        if passwd != passwd_conf:
            raise serializers.ValidationError("Password don't match")
        password_validation.validate_password(passwd)
        return data
    
    def create(self, data):
        """Handle user and profile creation."""
        data.pop('password_confirmation')
        user = User.objects.create_user(**data)  
        Profile.objects.create(user=user)
        return user

