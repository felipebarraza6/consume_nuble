"""Products Models."""

# Django
from django.db import models

# Utilities
from core.utils.models import ApiModel


class Product(ApiModel):    

    enterprise = models.ForeignKey('commerce.Enterprise', on_delete=models.CASCADE)
    name = models.CharField(max_length=120, blank=False, null=False)
    description = models.CharField(max_length=220, blank=False, null=False)
    sku = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField('image product', upload_to='products', blank=True, null=True)
    normal_price = models.IntegerField(blank=True, null=True)
    reduced_price = models.IntegerField(blank=True, null=True)

    is_gift = models.BooleanField(
        'Gift',
         default = False
    )
    is_delivery = models.BooleanField(
        'Delivery',
         default = False
    )
    is_active = models.BooleanField(
        'Active',
         default = True
    )

    def __str__(self):
        return ("{}".format(str(self.name)))