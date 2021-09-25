from django.contrib import admin
from .models import ReturnRecord

class RecordAdmin(admin.ModelAdmin):
    search_fields = [
            'return_id', 'order_id'
    ]

admin.site.register(ReturnRecord, RecordAdmin)