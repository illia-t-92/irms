from django.db import models

class Brand(models.Model):
    code=models.IntegerField()
    name=models.CharField(max_length=50)
    slug=models.SlugField()
    sender_bank_code=models.BigIntegerField(blank=True, null=True)
    sender_bank_account=models.CharField(max_length=29)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f'/{self.slug}/'
