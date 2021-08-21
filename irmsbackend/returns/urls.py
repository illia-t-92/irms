from django.urls import path, include
from .views import ReturnRecordList

urlpatterns = [
    path('returns-list', ReturnRecordList.as_view())
]