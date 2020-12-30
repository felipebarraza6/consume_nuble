"""Products View."""

# Django REST Framework
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

# Filters
from django_filters import rest_framework as filters

# Models
from core.commerce.models import Product, Stock

# Serializers
from core.commerce.serializers import ProductModelSerializer, ListProductSerializer, StockModelSerializer

class UpdateStock(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin
                 ):

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permissions = [AllowAny]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action == 'partial_update':
            return StockModelSerializer
    

    queryset = Stock.objects.all()
    lookup = 'product'
    filter_backends = (filters.DjangoFilterBackend,)

class ProductViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permissions = [AllowAny]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action == 'list':
            return ListProductSerializer
        if self.action == 'retrieve':
            return ListProductSerializer
        else:
            return ProductModelSerializer

    queryset = Product.objects.all()
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)

    def create(self, request):
        serializer = ProductModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        data = ProductModelSerializer(product).data
        return Response(data, status=status.HTTP_201_CREATED)