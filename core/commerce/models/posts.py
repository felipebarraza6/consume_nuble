"""Blog News."""

from django.db import models

# Core Model
from core.utils.models import ApiModel


class Post(ApiModel):
    title = models.CharField(max_length=25)
    description = models.TextField(max_length=500)
    principal_image = models.ImageField(null=True, blank=True)


    def __str__(self):
        return str(self.title)
