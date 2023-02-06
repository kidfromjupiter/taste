from django.db import models
from djmoney.models.fields import MoneyField
import uuid

# Create your models here.
class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stock = models.IntegerField(default=0)
    image  = models.ImageField(upload_to='products/', blank=True, null=True)
    domestic_price = MoneyField(max_digits=14, decimal_places=3, default_currency='LKR')
    international_price = MoneyField(max_digits=14, decimal_places=3, default_currency='USD')

    def __str__(self):
        return self.name