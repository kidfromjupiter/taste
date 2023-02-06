from django.db import models

class Cart(models.Model):
    user = models.ForeignKey('custom_auth.User', on_delete=models.CASCADE)
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return self.user.username

    def get_total(self):
        return self.product.price * self.quantity

    def get_domestic_total(self):
        return self.product.domestic_price * self.quantity

    def get_international_total(self):
        return self.product.international_price * self.quantity


# Create your models here.
