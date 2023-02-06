from django.db import models

class CartItem(models.Model):
    product = models.OneToOneField('products.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    
class Cart(models.Model):
    user = models.ForeignKey('custom_auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
    

# Create your models here.
