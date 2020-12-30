"""Enterprise models admin."""

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from core.commerce.models import (Enterprise, 
                                EnterpriseProfile, 
                                Category, 
                                Order, 
                                Checkout, 
                                Stock, 
                                Product,
                                Place,
                                Rating)


@admin.register(Enterprise)
class Emterprise(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('id','name')

@admin.register(Category)
class Categoies(admin.ModelAdmin):
    """Category model admin."""
    list_display = ('id','description')

@admin.register(EnterpriseProfile)
class EmterpriseProfile(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('id','enterprise')

@admin.register(Order)
class Orders(admin.ModelAdmin):
    """Order model admin."""
    list_display = ('id','client', 'get_products')
    
    def get_products(self, obj):
        return ", ".join([str(p) for p in obj.products.all()])

@admin.register(Product)
class Products(admin.ModelAdmin):
    """Order model admin."""
    list_display = ('id','name')

@admin.register(Stock)
class Stocks(admin.ModelAdmin):
    """Stock model admin."""
    list_display = ('id','product')

@admin.register(Checkout)
class Checkouts(admin.ModelAdmin):
    """Checkout model admin."""
    list_display = ('id','client')


@admin.register(Place)
class Places(admin.ModelAdmin):
    """Places model admin."""
    list_display = ('name', 'description', 'is_enterprise', 'is_place')

@admin.register(Rating)
class Ratings(admin.ModelAdmin):
    """Ratings model admin."""
    list_display = ('place', 'rating', 'commentary')    