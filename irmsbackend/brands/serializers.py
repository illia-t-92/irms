from rest_framework import serializers
from .models import Brand

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model=Brand
        fields=(
            "id",
            "code",
            "name",
            "brand_slug",
            "get_absolute_url",
        )