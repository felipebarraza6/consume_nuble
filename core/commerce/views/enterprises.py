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
from core.commerce.serializers import EnterpriseModelSerializer,CategoryModelSerializer,EnterpriseProfileModelSerializer, ListEnterpriseSerializer
# Models
from core.commerce.models import Enterprise, Category, EnterpriseProfile


class ProfileViewSet(viewsets.GenericViewSet,
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
    
    queryset = EnterpriseProfile.objects.all()
    serializer_class = EnterpriseProfileModelSerializer
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)

class CategoryViewSet(viewsets.GenericViewSet,
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
    
    queryset = Category.objects.all()
    serializer_class = CategoryModelSerializer
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)
    

class EnterpriseViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):
    
    def get_permissions(self):
        """Assign permissions based on action."""        
        if self.action in ['list', 'retrieve']:
            permissions = [AllowAny]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    queryset = Enterprise.objects.all()
    serializer_class = EnterpriseModelSerializer
    lookup_field = 'id'
    filter_backends = (filters.DjangoFilterBackend,)

    class EnterpriseFilter(filters.FilterSet):
        class Meta:
            model = Enterprise
            fields = {               
                }         
    
    filterset_class = EnterpriseFilter

    def get_serializer_class(self):
        if self.action == 'list':
            return ListEnterpriseSerializer
        if self.action == 'retrieve':
            return ListEnterpriseSerializer
        else:
            return EnterpriseModelSerializer

    def create(self, request):
        serializer = EnterpriseModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enterprise = serializer.save()
        data = EnterpriseModelSerializer(enterprise).data
        return Response(data, status=status.HTTP_201_CREATED)