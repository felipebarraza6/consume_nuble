"""User model."""

#Django 
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

#Utilities
from core.utils.models import ApiModel

class User(ApiModel, AbstractUser):
    """

    Re-utilizaremos en modelo abstracto de usuarios para extender las funcionalidades
    agregandole nuestro modelos abstracto para utilizar sus propiedades

    """
    email = models.EmailField(
        'email address',
        unique = True,
        error_messages={
            'unique': 'A user with that email already exists.'
        }
    )

    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +9999999. Up to 15 digits allowed."
    )

    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'phone_number']

    is_verified = models.BooleanField(
        'verified',
        default=True,
        help_text='Set to true when the user have verified its email addreess'
    )


    def __str__(self):
        return self.username

    def get_short_name(self):
        return self.username
