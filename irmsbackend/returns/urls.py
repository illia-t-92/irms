from django.urls import path, include
from .views import (
    ReturnRecordList,
    ReturnRecordDetail
)

urlpatterns = [
    path('records-list/', ReturnRecordList.as_view()),
    path('return-record/<uuid:uuid>/detail', ReturnRecordDetail.as_view())
]