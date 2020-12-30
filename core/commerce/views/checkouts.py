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

# Models
from core.commerce.models import Checkout

from core.commerce.serializers import CheckoutModelSerializer, CreateCheckoutModelSerializer, UpdateCheckoutSerializer


class CheckoutViewSet(viewsets.GenericViewSet,
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
    
    queryset = Checkout.objects.all()
    serializer_class = CheckoutModelSerializer
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)

    def get_serializer_class(self):
        if self.action == 'list':
            return CheckoutModelSerializer
        if self.action == 'retrieve':
            return CheckoutModelSerializer
        if self.action == 'create':
            return CreateCheckoutModelSerializer
        if self.action == 'partial_update':
            return UpdateCheckoutSerializer
        else:
            return CheckoutModelSerializer
