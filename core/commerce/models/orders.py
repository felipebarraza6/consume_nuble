"""Orders Models."""

# Django
from django.db import models

# Utilities
from core.utils.models import ApiModel


class Order(ApiModel):

    client = models.ForeignKey('users.User', on_delete=models.PROTECT)    
    products = models.ManyToManyField('commerce.Product', related_name='products')
    
    total_amount = models.IntegerField(null=False, blank= False)
    order_date = models.DateTimeField()

    is_paid = models.BooleanField(
        'Paid',
         default = False
    )

    is_active = models.BooleanField(
        'Active',
        default = True
    )

    is_cancelled = models.BooleanField(
        'Cancelled',
         default = False
    )

    is_gift = models.BooleanField(
        'Gift',
         default = False
    )

    is_delivery = models.BooleanField(
        'Delivery',
         default = False
    )

    def __str__(self):
        return ("{}".format(str(self.client)))