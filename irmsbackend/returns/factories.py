import factory
import datetime
from .models import ReturnRecord
from brands.models import Brand

class ReturnRecordFactory(factory.django.DjangoModelFactory):
    class Meta:
        model=ReturnRecord
    
    return_id=factory.Faker('random_number', digits=8, fix_len=True)
    order_id=factory.Faker('random_number', digits=12, fix_len=True)
    brand=factory.Iterator(Brand.objects.all())
    operation_date=factory.Faker(
        'date_time_between',
        start_date='-2y',
        end_date='now',
        tzinfo=datetime.timezone(offset=datetime.timedelta(hours=3))
        )
    amount=factory.Faker('pydecimal', right_digits=2, positive=True, min_value=199.00, max_value=9999.00)
    customer_name=factory.Faker('first_name')
    customer_surname=factory.Faker('last_name')
    customer_PID=order_id=factory.Faker('random_number', digits=9, fix_len=True)
    customer_account=factory.Faker('iban')
    sender_bank_code=factory.Faker('random_number', digits=6, fix_len=True)
    sender_company_name=factory.Iterator(Brand.objects.all())
    sender_bank_account='UA111222333444555666777888999'
    payment_details=factory.LazyAttribute(lambda o: f'Return of payment for order {o.order_id} to {o.customer_name} {o.customer_surname}')
    status='NEW' 
