"""Enterprise views."""

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

# Serializers
from core.commerce.serializers import CreateOrderSerializer, ListOrderSerializer, UpdateStateSerializer

# Models
from core.commerce.models import Order

class OrderViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):

    def get_permissions(self):
        if self.action in []:
            permissions = [AllowAny]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateOrderSerializer
        if self.action == 'partial_update':
            return UpdateStateSerializer
        else:
            return ListOrderSerializer

    queryset = Order.objects.all()
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)

    
    
                        