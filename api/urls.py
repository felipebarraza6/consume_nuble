
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path(r'users/', include('core.users.urls')),
    path(r'commerce/', include('core.commerce.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
