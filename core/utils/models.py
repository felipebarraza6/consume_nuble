"""Modelo abstracto de utilidades."""

# Django
from django.db import models

class ApiModel(models.Model):
    
    created = models.DateTimeField(
        'created at',
        auto_now_add=True        
    )

    modified = models.DateTimeField(
        'modified at',
        auto_now_add=True        
    )

    class Meta:
        """Declaracion Abstracta."""
        abstract=True,
        get_latest_by='created',
        ordering=['-created', '-modified']