"""Places Serializers."""

#Django Rest Framework
from rest_framework import serializers
from django.db.models import Sum

#Models
from core.commerce.models import Place, Rating
from core.users.models import User

#Serializers 
from core.commerce.serializers import EnterpriseModelSerializer


#List
class ListSerializerPlace(serializers.ModelSerializer):
    enterprise = EnterpriseModelSerializer(many = False, read_only=True)
    class Meta:
        model = Place
        fields = '__all__'

#CreateRating
class CreateRatingSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())        
    class Meta:
        model = Rating
        fields = '__all__'
    
    def create(self, data):            
        #Capture id place
        id_place = data['place'].id
        #Capture data rating
        rate = data['rating']
        #Filter and Aggregate sum value actual
        place = Place.objects.filter(id=id_place).aggregate(
            Sum('rating')
        )        
        #Only Int for SUM
        place_value = place['rating__sum']
        #Update Data
        update_data_place = Place.objects.filter(id=id_place).update(
            rating = place_value+rate
        )        
        #Create Rating
        craete_rating = Rating.objects.create(
            user=data['user'],
            rating=rate,
            place=data['place'],
            commentary=data['commentary']
        )
        #Return created rating!
        return craete_rating
        
        
        #Return data modified for place id
        
        
        
        
        
        

#List Ratings
class ListRatingsSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)
    class Meta:
        model = Rating
        fields = '__all__'