"""Places Views."""

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
from core.commerce.serializers import (ListSerializerPlace,
                                ListRatingsSerializer, 
                                CreateRatingSerializer)

# Models
from core.commerce.models import Place, Rating


class PlaceView(viewsets.GenericViewSet,                    
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin):
    permission_classes = [AllowAny]    
    serializer_class = ListSerializerPlace

    queryset = Place.objects.all()
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)

    class PlacesFilter(filters.FilterSet):
        class Meta:
            model = Place
            fields = {
                'is_enterprise':['exact'],
                'is_place': ['exact']
            }
    
    filterset_class = PlacesFilter


class RatingViewSet(viewsets.GenericViewSet,
                    mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin):
    
    def get_permissions(self):
        if self.action in ['create']:
            permissions = [IsAuthenticated]
        else:
            permissions = [AllowAny]
        return [p() for p in permissions]    

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateRatingSerializer
        else:
            return ListRatingsSerializer

    class RatingFilter(filters.FilterSet):
        class Meta:
            model = Rating
            fields = {
                'place':['exact'],
            }
    
    filterset_class = RatingFilter

    queryset = Rating.objects.all().filter(is_active=True)    
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend, )

    

    