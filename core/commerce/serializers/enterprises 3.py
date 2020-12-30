"""Enterprise Serializer."""

# Django REEST Framework
from rest_framework import serializers

# Models
from core.commerce.models import Enterprise, Category, EnterpriseProfile, Product

# Serializers
from .products import ProductModelSerializer


class EnterpriseProfileModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = EnterpriseProfile
        fields = '__all__'

class ListEnterpriseSerializer(serializers.ModelSerializer):

    profile = serializers.SerializerMethodField('get_profile')
    products = serializers.SerializerMethodField('get_products')
    category = serializers.StringRelatedField(many=False)
    
    def get_profile(self, enterprise):
        qs = EnterpriseProfile.objects.filter(enterprise=enterprise)    
        serializer =  EnterpriseProfileModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    def get_products(self, product):
        qs = Product.objects.filter(enterprise=product)    
        serializer =  ProductModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model= Enterprise
        fields = (
            'name',
            'legal_name',
            'phone_number',
            'email',
            'is_restaurant',
            'is_producer',
            'is_bar',
            'is_delivery',
            'is_gitfcard',
            'category',
            'profile',
            'products'
            )


class EnterpriseModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Enterprise
        fields = '__all__'

    def create(self, data):
        enterprise = Enterprise.objects.create(**data)
        EnterpriseProfile.objects.create(enterprise=enterprise)
        return enterprise


class CategoryModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


        