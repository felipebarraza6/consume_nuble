"""Routes Tourism Serializers. """

# Django REST
from rest_framework import serializers

# Models
from core.commerce.models import Route, DayNumber, ElementDay


class RouteModelSerializer(serializers.ModelSerializer):
    days = serializers.SerializerMethodField('get_day_for_route')
    def get_day_for_route(self, route):
        qs = DayNumber.objects.filter(route=route.id).reverse()
        serializer = DayNumberModelSerializer(instance=qs, many=True)
        return serializer.data

    class Meta:
        model = Route
        fields = '__all__'
    

class DayNumberModelSerializer(serializers.ModelSerializer):
    elements = serializers.SerializerMethodField('get_elements_for_day')
    def get_elements_for_day(self, day):
        qs = ElementDay.objects.filter(number_day=day.id).reverse()
        serializer = ElementDayModelSerializer(instance=qs, many=True)
        return serializer.data

    class Meta:
        model = DayNumber
        fields = '__all__'

class ElementDayModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElementDay
        fields = '__all__'
