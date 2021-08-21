from django.urls import path, include
from .views import BrandList

urlpatterns = [
    path('brands/', BrandList.as_view()),
]