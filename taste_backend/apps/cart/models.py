from django.db import models
from djmoney.models.fields import MoneyField
from djmoney.money import Money

class CartItem(models.Model):
    product = models.OneToOneField('products.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE,related_name='cartitems')

#TODO: add logic for total price
class Cart(models.Model):
    user = models.ForeignKey('custom_auth.User', on_delete=models.CASCADE)
    value = MoneyField(max_digits=14, decimal_places=3, default_currency='LKR',default=Money("0",'LKR'))
    def __str__(self):
        return self.user.email
    def get_total(self):
        value = Money("0","LKR")
        if self.pk != None:
            #the case where i cant use this relationship when the cart object is created
            for cartItem in self.cartitems.all():
                value += cartItem.product.domestic_price * cartItem.quantity
        return value
    def save(self,*args,**kwargs) :
        self.value = self.get_total()
        super().save(*args,**kwargs)
        # super().save(*args,**kwargs)
    
    
# Create your models here.
