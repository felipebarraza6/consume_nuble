"""Routes Tourism."""

# Django REST
from rest_framework import mixins, status, viewsets
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

# Filters
from django_filters import rest_framework as filters

# Serializers
from core.commerce.serializers import RouteModelSerializer

# Models
from core.commerce.models import Route

class RouteTourismViewSet(viewsets.GenericViewSet,
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin):
    permission_classes = [AllowAny]
    serializer_class = RouteModelSerializer
    queryset = Route.objects.all()
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)

