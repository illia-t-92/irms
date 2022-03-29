from rest_framework import serializers
from .models import ReturnRecord
from brands.models import Brand
from brands.serializers import BrandShortSerializer

class ReturnRecordSerializer(serializers.ModelSerializer):
    brand=BrandShortSerializer()
    status_verbose = serializers.CharField(source='get_status_display')

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
            'comments',
            'status_verbose',
            'get_absolute_url',
            'brand',
        )

    def update(self, instance, validated_data):
        #remove brand from validated data as it should never be changed on update
        validated_data.pop('brand')
        return super(ReturnRecordSerializer, self).update(instance, validated_data)

#different serializer for POST method
class CreateReturnRecordSerializer(serializers.ModelSerializer):
    brand=BrandShortSerializer()

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
            'comments',
            'get_absolute_url',
            'brand',
        )

    def create(self, validated_data):
        brand_data = validated_data.pop('brand')
        brand = Brand.objects.filter(code=brand_data['code']).first()
        validated_data.update({'brand': brand})
        record=ReturnRecord.objects.create(**validated_data)
            
        return record