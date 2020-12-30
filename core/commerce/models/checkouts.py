"""Checkouts Models."""

# Django
from django.db import models

# Utilities
from core.utils.models import ApiModel


class Checkout(ApiModel):
    
    client = models.ForeignKey('users.User', on_delete=models.PROTECT)
    
    enterprises_morning = models.ManyToManyField('commerce.Enterprise', related_name='enterprises_morning')
    enterprises_afternoon = models.ManyToManyField('commerce.Enterprise', related_name='enterprises_afternoon')
    enterprises_night = models.ManyToManyField('commerce.Enterprise', related_name='enterprises_nigth')
    
    date_checkout = models.DateField()
    note = models.CharField(max_length=200, blank=False, null=False)
    
    is_active = models.BooleanField(
        'Active',
         default = True
    )

    is_accepted = models.BooleanField(
        'Accepted',
         default = False
    )

    is_cancelled = models.BooleanField(
        'Cancelled',
         default = False
    )

    def __str__(self):
        return self.client