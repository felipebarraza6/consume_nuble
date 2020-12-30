#Models Places

 #Django
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

#Utilities
from core.utils.models import ApiModel


class Place(ApiModel):
    #Optional Creation
    enterprise = models.ForeignKey(
        'commerce.Enterprise',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='enterprise_place'
    )

    #Basic Information
    name = models.CharField(max_length=150, blank=False, null=False)
    description = models.CharField(max_length=1000, blank=True, null=True)    

    #Geography
    region = models.CharField(max_length=150, blank=False, null=False)
    province = models.CharField(max_length=150, blank=False, null=False)
    commune = models.CharField(max_length=150, blank=False, null=False)

    #Location
    latitud = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    #Media
    banner_image = models.ImageField(blank=True, null=True)
    principal_image = models.ImageField(blank=True, null=True)
    gallery_one = models.ImageField(blank=True, null=True) 
    gallery_two = models.ImageField(blank=True, null=True)
    gallery_three = models.ImageField(blank=True, null=True)

    #URLS    
    facebook = models.URLField(max_length=350, blank=True)
    instagram = models.URLField(max_length=350, blank=True)
    whatsapp = models.URLField(max_length=350, blank=True)
    web = models.URLField(max_length=350, blank=True)
    digital_menu = models.URLField(max_length=350, blank=True)

    #Stats
    rating = models.IntegerField(
        null=True, 
        blank=True, 
        default=0,         
    )

    is_place = models.BooleanField(default=True, blank=False, null=False)
    is_enterprise = models.BooleanField(default=False, blank=False, null=False)
    
    def __str__(self):
        return self.name


class Rating(ApiModel):
    user = models.ForeignKey(
        'users.User',
        on_delete = models.SET_NULL,
        null=True,
        blank=True,
        related_name='owner_rated' 
    )
    place = models.ForeignKey(
        'commerce.Place',
        on_delete = models.SET_NULL,
        null=True,
        related_name='rated_place'
    )
    rating = models.IntegerField(default=1)
    commentary = models.TextField(max_length=600 ,blank=True, null=True)

    is_active = models.BooleanField(default=False, blank=False, null=False)
    

    def __str__(self):
        return 'Place {} - rating: {}'.format(
            self.place,
            self.rating
        )