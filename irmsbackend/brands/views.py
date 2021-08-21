from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .models import Brand
from .serializers import BrandSerializer

class BrandList(generics.ListCreateAPIView):
    serializer_class = BrandSerializer
    queryset=Brand.objects.all()
    #permission_classes=(IsAuthenticated,)
