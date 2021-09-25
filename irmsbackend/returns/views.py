from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import ReturnRecord
from .serializers import ReturnRecordSerializer
from .filters import ReturnRecordFilter

class ReturnRecordList(generics.ListCreateAPIView):
    serializer_class = ReturnRecordSerializer
    filterset_class = ReturnRecordFilter
    queryset=ReturnRecord.objects.all()
    ordering_fields = ['return_id', 'order_id', 'operation_date', 'amount', 'customer_name', 'customer_surname', 'status']
    ordering = ['-operation_date']
    #permission_classes=(IsAuthenticated,)

class ReturnRecordDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ReturnRecordSerializer
    #permission_classes=(IsAuthenticated,)

    def get_object(self):
        obj=get_object_or_404(
        ReturnRecord, 
        uuid=self.kwargs.get('uuid'))
        return obj
