"""Users URLs."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from core.commerce import views

router = DefaultRouter()

router.register(r'enterprises', views.EnterpriseViewSet, basename='enterprise')
router.register(r'categories', views.CategoryViewSet, basename='categories')
router.register(r'edit_profile', views.ProfileViewSet, basename='edit_profile')

router.register(r'products', views.ProductViewSet, basename='products')
router.register(r'stocks', views.UpdateStock, basename='stocks')

router.register(r'orders', views.OrderViewSet, basename='orders')
router.register(r'checkouts', views.CheckoutViewSet, basename='checkouts')
router.register(r'places', views.PlaceView, basename='places')
router.register(r'ratings', views.RatingViewSet, basename='ratings')

urlpatterns = [
	path('', include(router.urls)),	
]

