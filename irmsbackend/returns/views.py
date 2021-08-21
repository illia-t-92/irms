from django.shortcuts import render
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated

from .models import ReturnRecord
from .serializers import ReturnRecordSerializer

class ReturnRecordList(generics.ListCreateAPIView):
    serializer_class = ReturnRecordSerializer
    pagination_class=LimitOffsetPagination
    queryset=ReturnRecord.objects.all()
    #permission_classes=(IsAuthenticated,)
