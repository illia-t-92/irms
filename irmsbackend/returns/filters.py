from django_filters import rest_framework as filters
from .models import ReturnRecord

class ReturnRecordFilter(filters.FilterSet):

    class Meta:
        model=ReturnRecord
        fields=['return_id', 'order_id', 'operation_date', 'amount', 'customer_name', 'customer_surname', 'status']
