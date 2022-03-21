from rest_framework import serializers
from .models import ReturnRecord
from brands.models import Brand
from brands.serializers import BrandSerializer

class ReturnRecordSerializer(serializers.ModelSerializer):
    brand=BrandSerializer()
    status_verbose=serializers.CharField(source='get_status_display')

    class Meta:
        model=ReturnRecord
        fields=(
            'uuid',
            'return_id',
            'operation_date',
            'amount',
            'order_id',
            'customer_name',
            'customer_surname',
            'customer_PID',
            'customer_account',
            'payment_details',
            'status',
            'status_verbose',
            'comments',
            'get_absolute_url',
            'brand',
        )
        '''
        read_only_fields=[
            'uuid',
            'sender_bank_code',
            'sender_company_name',
            'sender_bank_account',
            'status_verbose',
            'get_absolute_url',
        ]
        '''

    def create(self, validated_data):
        brand_data = validated_data.pop('brand')
        brand = Brand.objects.filter(id=brand_data['id']).first()
        validated_data.update({'brand': brand})
        record=ReturnRecord.objects.create(**validated_data)
            
        return record
    
    def update(self, instance, validated_data):
        #remove brand from validated data as it should never be changed on update
        validated_data.pop('brand')
        return super(ReturnRecordSerializer, self).update(instance, validated_data)  