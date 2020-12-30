"""Enterprise Profile Model."""

# Django
from django.db import models

# Utilities
from core.utils.models import ApiModel



class EnterpriseProfile(ApiModel):
    
    enterprise = models.OneToOneField('commerce.Enterprise', on_delete=models.CASCADE)
    logo = models.ImageField('image logo', upload_to='enpterprise/logos', blank=True, null=True)
    banner = models.ImageField('banner logo', upload_to='enpterprise/banners', blank=True, null=True)

    region = models.CharField(max_length=100, blank=True, null=True)
    commune = models.CharField(max_length=100, blank=True, null=True)
    province = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    
    description = models.CharField(max_length=300, blank=True, null=True)
    history = models.CharField(max_length=300, blank=True, null=True)    
    
    facebook = models.URLField(max_length=150, blank=True, null=True)
    instagram = models.URLField(max_length=150, blank=True, null=True)
    
    def __str__(self):
        return ("{}".format(str(self.enterprise)))