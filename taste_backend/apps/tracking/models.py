from django.db import models
import string
import random
from djmoney.models.fields import MoneyField
# Create your models here.
def generate_order_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
class Order(models.Model):
    id = models.CharField(default=generate_order_id, primary_key=True, max_length=10)
    user = models.ForeignKey("custom_auth.User", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=64, choices=[("PROCESSING", "PROCESSING"), ("PACKAGED", "PACKAGED"), ("DISPATCHED", "DISPATCHED"), ("CANCELLED", "CANCELLED")])
    total = MoneyField(max_digits=14, decimal_places=3, default_currency='LKR')
    address = models.ForeignKey("custom_auth.Address", on_delete=models.PROTECT)
    eta = models.DateTimeField(null=True)

    def set_status(self, status):
        self.status = status
        self.save()


    def __str__(self):
        return f"Order {self.id}"