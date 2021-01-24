"""Route Tourism."""

from django.db import models

# Utils
from core.utils.models import ApiModel


class Route(ApiModel):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=320)
    whats_app = models.CharField(max_length=200, null=True, blank=True)
    image_principal = models.ImageField(blank=True, null=True)
    image_gallery = models.ImageField(blank=True, null=True)

    def __str__(self):
        return str(self.name)

class DayNumber(ApiModel):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    number_day = models.IntegerField()
    title = models.CharField(max_length=200)
    
    def __str__(self):
        return ('{} - {}').format(self.route, self.number_day)

class ElementDay(ApiModel):
    number_day = models.ForeignKey(DayNumber, on_delete=models.CASCADE)
    description = models.TextField(max_length=320)

    def __str__(self):
        return str(self.number_day)
