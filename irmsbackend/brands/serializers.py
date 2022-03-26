from rest_framework import serializers
from .models import Brand

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model=Brand
        fields=(
            "id",
            "code",
            "name",
            'sender_bank_code',
            'sender_bank_account',
            "slug",
            "get_absolute_url",
        )

class BrandShortSerializer(serializers.ModelSerializer):
    class Meta:
        model=Brand
        fields=(
            "code",
            "name",
        )