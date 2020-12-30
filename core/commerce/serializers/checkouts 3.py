"""Checkout Serializer."""

# Django REEST Framework
from rest_framework import serializers

# Models
from core.commerce.models import Checkout

from core.commerce.serializers import ListEnterpriseSerializer

class CheckoutModelSerializer(serializers.ModelSerializer):

    enterprises_morning = ListEnterpriseSerializer(many=True)
    enterprises_afternoon = ListEnterpriseSerializer(many=True)
    enterprises_night = ListEnterpriseSerializer(many=True)    

    class Meta:
        model = Checkout
        fields = '__all__'

class CreateCheckoutModelSerializer(serializers.ModelSerializer):

    client = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Checkout
        fields = '__all__'
        
class UpdateCheckoutSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Checkout
        fields = '__all__'
        read_only_fields = (
            'created',
            'modified',
            'client'
        )