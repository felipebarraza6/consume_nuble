"""Stocks Models."""

# Django
from django.db import models

# Utilities
from core.utils.models import ApiModel


class Stock(ApiModel):    
    product = models.OneToOneField('commerce.Product', on_delete=models.CASCADE)
    quantity_stock = models.IntegerField(blank=True, null=True)
    quantity_alert = models.IntegerField(blank=True, null=True)
    quantity_for_box = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return ("{}".format(str(self.product)))