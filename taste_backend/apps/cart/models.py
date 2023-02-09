from django.db import models

class CartItem(models.Model):
    product = models.OneToOneField('products.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE)

    # def __str__(self):
    #     return self.user.username
    
    def addtocart(self,quantity=1):
        """Add product to cart"""

        self.product.decrease_stock(quantity=quantity)
        if self.quantity - quantity <= 0:
            self.quantity = quantity
    
    def decrease_quantity(self,quantity=1):
        """Reduce quantity of product in cart"""

        if self.quantity - quantity <= 0:
            self.removefromcart()
        else:
        # increasing product stock
            self.quantity -= quantity
            self.product.increase_stock(quantity=quantity)
            self.save()
    
    def increase_quantity(self,quantity=1):
        """Increase quantity of product in cart"""

        if self.product.stock - self.quantity - quantity < 0:
            self.quantity = self.product.stock
        else:
        # reducing product stock
            self.quantity += quantity
            self.product.decrease_stock(quantity=quantity)
        self.save()

    def removefromcart(self):
        """Remove product from cart"""
        self.product.increase_stock(self.quantity)
    
    def save(self,*args, **kwargs):
        super().save(*args, **kwargs)

    def delete(self,*args, **kwargs):
        self.removefromcart()
        super().delete(*args, **kwargs)

class Cart(models.Model):
    user = models.ForeignKey('custom_auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
    
    
# Create your models here.
