"""Posts Serializers."""

# Django Rest
from rest_framework import serializers

# Models
from core.commerce.models import Post


class PostModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
