"""Enterprise Model."""

# Django
from django.db import models
from django.core.validators import RegexValidator

# Utilities
from core.utils.models import ApiModel


class Enterprise(ApiModel):
    ## General Information
    
    name = models.CharField(max_length=50, blank=False, null=False)
    legal_name = models.CharField(max_length=50, blank=False, null=False)

    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +9999999. Up to 15 digits allowed."
    )

    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    email = models.EmailField('email address', unique=True, blank=False, null=False)
   
    category = models.ForeignKey('Category', related_name='enterprise_category', on_delete=models.PROTECT, blank=True, null=True)

    is_restaurant = models.BooleanField(
        'Restaurant',
         default = False
    )

    is_producer = models.BooleanField(
        'Producer',
         default = False
    )

    is_bar = models.BooleanField(
        'Bar',
         default = False
    )

    is_delivery = models.BooleanField(
        'Delivery',
         default = False
    )

    is_gitfcard = models.BooleanField(
        'Gift',
         default = False
    )
    
    def __str__(self):
        return self.name

class Category(ApiModel):

    description = models.CharField(max_length=200, blank=False, null=False)

    def __str__(self):
        return self.description        

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
