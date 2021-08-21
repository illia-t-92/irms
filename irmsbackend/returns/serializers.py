from rest_framework import serializers
from .models import ReturnRecord
from brands.models import Brand
from brands.serializers import BrandSerializer

class ReturnRecordSerializer(serializers.ModelSerializer):
    brand=BrandSerializer()

    class Meta:
        model=ReturnRecord
        fields=(
            'return_id',
            'operation_date',
            'amount',
            'order_id',
            'customer_name',
            'customer_surname',
            'customer_PID',
            'customer_account',
            'sender_bank_code',
            'sender_company_name',
            'sender_bank_account',
            'payment_details',
            'brand',
            'status',
            'comments',
            'updated_at',
            'created_by',
        )

    def create(self, validated_data):
        brand_data = validated_data.pop('brand')
        brand = Brand.objects.filter(id=brand_data['id']).first()
        validated_data.update({'brand': brand})
        record=ReturnRecord.objects.create(**validated_data)
            
        return record