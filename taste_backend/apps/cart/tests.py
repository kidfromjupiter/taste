from django.test import TestCase
from rest_framework.test import APITestCase
from apps.custom_auth.models import User
from .models import Cart,CartItem
from apps.products.models import Product
from apps.products.serializers import ProductSerializer
from faker import Faker
from djmoney.money import Money
from apps.custom_auth.serializers import UserSerializer
class CartTestCase(APITestCase,TestCase):
    faker = Faker()
    email = faker.email()
    first_name = faker.first_name()
    last_name = faker.last_name()
    password = faker.password(
        length=10,
        special_chars=True,
        digits=True,
        upper_case=True,
        lower_case=True
    )
    name = 'test product'
    description = faker.text()
    stock = 20
    domestic_price = Money(100,'LKR')
    international_price = Money(100,'USD')
    image = 'https://picsum.photos/200/300',
    def setUp(self) -> None:
        self.user = User.objects.create_user(
            email = self.email,
            first_name = self.first_name,
            last_name = self.last_name,
            password = self.password
        )
        self.cart = Cart.objects.create(user=self.user)
        self.product = Product.objects.create(
            name = self.name,
            description = self.description,
            stock = self.stock,
            domestic_price = self.domestic_price,
            international_price = self.international_price,
            image = self.image,
        )
        self.product2 = Product.objects.create(
            name = 'product 2',
            description = self.description,
            stock = 100,
            domestic_price = self.domestic_price,
            international_price = self.international_price,
            image = self.image,
        )
    def test_addtocart(self):
        #product stock should decrease by 10
        response = self.client.post(f'/api/cart/addtocart/',{'product':self.product.pk,'quantity':10,'user':self.user.pk},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product.pk).stock,self.product.stock - 10)

        #adding to cart again should increase quantity
        response = self.client.post(f'/api/cart/addtocart/',{'product':self.product.pk,'quantity':3,'user':self.user.pk},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product.pk).stock,self.product.stock - 13)
        self.assertEqual(response.data['quantity'],13)
        
    
    def test_addtocart_with_invalid_quantity(self):
        #product stock should not decrease
        response = self.client.post(f'/api/cart/addtocart/',{'product':self.product.pk,'quantity':100,'user':self.user.pk},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product.pk).stock,self.product.stock)

    def test_increasequantity_with_invalid_quantity(self):
        #product stock should not decrease

        # adding to cart
        cartResponse = self.client.post(f'/api/cart/addtocart/',{'product':self.product2.pk,'quantity':20,'user':self.user.pk},format='json')
        self.assertEqual(cartResponse.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product2.pk).stock,self.product2.stock - 20)
        self.assertEqual(cartResponse.data['quantity'],20)

        #increasing quantity
        response = self.client.post(f'/api/cart/increasequantity/',{'cartItem':cartResponse.data['id'],'quantity':1000,'user':self.user.pk},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(cartResponse.data['quantity'],20)
        self.assertEqual(Product.objects.get(pk=self.product2.pk).stock,self.product2.stock-20)

    def test_increasequantity(self):
        #product stock should decrease by 10
        
        # adding to cart
        cartResponse = self.client.post(f'/api/cart/addtocart/',{'product':self.product2.pk,'quantity':20,'user':self.user.pk},format='json')
        self.assertEqual(cartResponse.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product2.pk).stock,self.product2.stock - 20)
        self.assertEqual(cartResponse.data['quantity'],20)

        #increasing quantity
        response = self.client.post(f'/api/cart/increasequantity/',{'cartItem':cartResponse.data['id'],'quantity':10,'user':self.user.pk},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(CartItem.objects.get(pk=response.data['id']).quantity,30)
        self.assertEqual(Product.objects.get(pk=self.product2.pk).stock,self.product2.stock-30)

    def test_decreasequantity(self):
        #product stock should increase by 10
        
        # adding to cart
        cartResponse = self.client.post(f'/api/cart/addtocart/',{'product':self.product2.pk,'quantity':20,'user':self.user.pk},format='json')
        self.assertEqual(cartResponse.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product2.pk).stock,self.product2.stock - 20)
        self.assertEqual(cartResponse.data['quantity'],20)

        #decreasing quantity
        response = self.client.post(f'/api/cart/decreasequantity/',{'cartItem':cartResponse.data['id'],'quantity':10,'user':self.user.pk},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(CartItem.objects.get(pk=response.data['id']).quantity,10)
        self.assertEqual(Product.objects.get(pk=self.product2.pk).stock,self.product2.stock-10)
    
    def test_decreasequantity_with_invalid_quantity(self):
        #product stock should increase to original value

        # adding to cart
        cartResponse = self.client.post(f'/api/cart/addtocart/',{'product':self.product2.pk,'quantity':20,'user':self.user.pk},format='json')
        self.assertEqual(cartResponse.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product2.pk).stock,self.product2.stock - 20)
        self.assertEqual(cartResponse.data['quantity'],20)

        #decreasing quantity
        response = self.client.post(f'/api/cart/decreasequantity/',{'cartItem':cartResponse.data['id'],'quantity':1000,'user':self.user.pk},format='json')
        self.assertEqual(response.status_code,204)
        self.assertEqual(self.product2.stock,Product.objects.get(pk=self.product2.pk).stock)
    
    def test_removefromcart(self):
        # adding to cart
        cartResponse = self.client.post(f'/api/cart/addtocart/',{'product':self.product2.pk,'quantity':20,'user':self.user.pk},format='json')
        self.assertEqual(cartResponse.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product2.pk).stock,self.product2.stock - 20)
        self.assertEqual(cartResponse.data['quantity'],20)

        #removing from cart
        response = self.client.delete(f'/api/cart/removefromcart/',{'cartItem':cartResponse.data['id'],'user':self.user.pk},format='json')
        self.assertEqual(response.status_code,204)
        self.assertEqual(self.product2.stock,Product.objects.get(pk=self.product2.pk).stock)
