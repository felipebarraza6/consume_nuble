"""Users URLs."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from core.users import views

router = DefaultRouter()

router.register(r'', views.UserViewSet, basename='users')

urlpatterns = [
	path('', include(router.urls)),
	path('password_reset', include('django_rest_passwordreset.urls'))
]

