from django.db import models
import uuid


class ReturnRecord(models.Model):

    NEW='NEW'
    OK='OK'
    CHECK='CHECK'
    PAID='PAID'
    REVIEW='REVIEW'
    BLOCK='BLOCK'
    STATUS_CHOICES=[
        (NEW, 'New'),
        (OK, 'Proceed'),
        (CHECK, 'Check'),
        (PAID, 'Paid'),
        (REVIEW, 'Review'),
        (BLOCK, 'Block'),
    ]


    uuid=models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    return_id=models.BigIntegerField(unique=True)
    operation_date=models.DateTimeField()
    amount=models.DecimalField(max_digits=10, decimal_places=2)
    order_id=models.BigIntegerField()
    customer_name=models.CharField(max_length=100)
    customer_surname=models.CharField(max_length=100)
    customer_PID=models.CharField(max_length=30, null=True)
    customer_account=models.CharField(max_length=50)
    #sender_bank_code=models.BigIntegerField(blank=True, null=True)
    #sender_company_name=models.CharField(max_length=100)
    #sender_bank_account=models.CharField(max_length=29)
    payment_details=models.TextField(verbose_name="payment details")
    brand=models.ForeignKey('brands.Brand', on_delete=models.CASCADE)
    status=models.CharField(max_length=6, verbose_name="status", default=NEW, choices=STATUS_CHOICES)
    comments=models.TextField(blank=True)
    updated_at=models.DateTimeField(auto_now=True)
    created_by=models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'Return # {self.return_id} for order {self.order_id}'

    def get_absolute_url(self):
        return f'return-record/{self.uuid}/detail'

    class Meta:
        ordering=['-operation_date']