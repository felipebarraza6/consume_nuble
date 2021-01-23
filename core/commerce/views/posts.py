"""Posts Views."""

# Django REST
from rest_framework import mixins, viewsets

# Models
from core.commerce.models import Post

# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

# Serializers
from core.commerce.serializers import PostModelSerializer

# Filters
from django_filters import rest_framework as filters


class PostViewSet(viewsets.GenericViewSet,
                mixins.ListModelMixin,
                mixins.RetrieveModelMixin):
    permission_classes = [AllowAny]
    serializer_class = PostModelSerializer
    queryset = Post.objects.all()
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)


