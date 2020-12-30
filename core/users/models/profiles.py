# Django
from django.db import models

# Utils
from core.utils.models import ApiModel

class Profile(ApiModel):

    user = models.OneToOneField('users.User', on_delete=models.CASCADE)

    dni = models.CharField(max_length=12, blank=True, null=True)

    birthday = models.DateField(blank=True, null=True)

    region = models.CharField(max_length=100, blank=True, null=True)
    commune = models.CharField(max_length=100, blank=True, null=True)
    province = models.CharField(max_length=100, blank=True, null=True)

    address = models.CharField(max_length=160, blank=True, null=True)

    def __str__(self):
        return("{}{}".format("@", str(self.user)))

