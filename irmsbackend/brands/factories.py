import factory
from django.utils.text import slugify
from .models import Brand


class BrandFactory(factory.django.DjangoModelFactory):
    class Meta:
        model=Brand

    code=factory.Faker('random_number', digits=5, fix_len=True)
    name=factory.Faker('company')
    slug=factory.LazyAttribute(lambda obj: slugify(f'{obj.name}'))
    