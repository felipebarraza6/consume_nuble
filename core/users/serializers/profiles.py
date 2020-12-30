# Models
from core.users.models import Profile

# DRF
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class ProfileModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=Profile
        fields= (
            'dni',
            'birthday',
            'region',
            'commune',
            'province',
            'address'
        )
