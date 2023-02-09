from django.db import models
from djmoney.models.fields import MoneyField
import uuid

# Create your models here.
class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=64)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stock = models.IntegerField(default=0)
    image  = models.URLField( max_length=200)
    domestic_price = MoneyField(max_digits=14, decimal_places=3, default_currency='LKR')
    international_price = MoneyField(max_digits=14, decimal_places=3, default_currency='USD')
    collection = models.ForeignKey("products.Collection",null=True, on_delete=models.PROTECT)

    def __str__(self):
        return self.name
    
    def decrease_stock(self,quantity=1):
        """Decrease stock of product"""
        if self.stock - quantity >= 0:
            self.stock -= quantity
            self.save()
    
    def increase_stock(self,quantity=1):
        """Increase stock of product"""
        self.stock += quantity
        self.save()


class Collection(models.Model):
    name = models.CharField(max_length=64)
    image = models.URLField(max_length=200)

