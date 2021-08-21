from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.authtoken')),
    path('api/v1/', include('core.urls')),
    path('api/v1/', include('brands.urls')),
    path('api/v1/', include('returns.urls')),
]
