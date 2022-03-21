from django.urls import path, include
from .views import BrandList, BrandListShort

urlpatterns = [
    path('brands/', BrandList.as_view()),
    path('brands-short/', BrandListShort.as_view()),
]