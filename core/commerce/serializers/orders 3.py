"""Order Serializer."""

# Django REEST Framework
from rest_framework import serializers

# Models
from core.commerce.models import Order


from core.commerce.serializers import ProductModelSerializer

class CreateOrderSerializer(serializers.ModelSerializer):    
    
    client = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Order
        fields = '__all__'

class UpdateStateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = (
            'created',
            'modified',
            'total_amount',
            'products',
            'client'
        )

class ListOrderSerializer(serializers.ModelSerializer):

    products = ProductModelSerializer(many=True)
    
    class Meta:
        model = Order
        fields = '__all__'