from django.db import models

class Brand(models.Model):
    code=models.IntegerField()
    name=models.CharField(max_length=50)
    brand_slug=models.SlugField()

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f'/{self.brand_slug}/'
