"""Product Serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from core.commerce.models import Product, Stock


class StockModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = '__all__'        

class ListProductSerializer(serializers.ModelSerializer):

    stock = StockModelSerializer(read_only=True)

    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'enterprise',
            'description',
            'sku',
            'image',
            'normal_price',
            'reduced_price',
            'stock',
            
            'is_gift',
            'is_delivery',
            'is_active'
        )



class ProductModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
    
    def create(self, data):
        product = Product.objects.create(**data)
        Stock.objects.create(product=product)
        return product