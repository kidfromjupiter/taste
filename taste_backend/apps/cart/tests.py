from django.test import TestCase
from dotenv import load_dotenv
import os
from rest_framework.test import APITestCase
from apps.custom_auth.models import User
from .models import Cart,CartItem
from apps.products.models import Product
from faker import Faker
from djmoney.money import Money
from datetime import timedelta
from firebase_admin import auth
import requests
class CartTestCase(APITestCase,TestCase):

    faker = Faker()
    email = faker.email()
    first_name = faker.first_name()
    last_name = faker.last_name()
    uid = '12345'
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
    image = 'https://picsum.phoos/200/300',
    def setUp(self) -> None:
        load_dotenv()
        token = auth.create_custom_token(uid="12345678",developer_claims={"email":"test@testmail.com","name":'test name'})
        idtoken = requests.post(f'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key={os.getenv("API_KEY")}',{"token":token,"returnSecureToken":True}).json()["idToken"]
        cookie = auth.create_session_cookie(idtoken,timedelta(hours=2))
        self.client.cookies.load({"session":cookie})
        self.user = User.objects.create_user(
            email = self.email,
            first_name = self.first_name,
            last_name = self.last_name,
            password = self.password,
            uid = self.uid
        )
        self.client.login(username=self.email,password=self.password)
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
    def test_addtocart_product_stock_decrease(self):
        #product stock should decrease by 10
        response = self.client.post(f'/api/cart/addtocart/',{'product':self.product.pk,'quantity':10},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product.pk).stock,self.product.stock - 10)
    def test_addtocart_to_same_product(self):
        response = self.client.post(f'/api/cart/addtocart/',{'product':self.product.pk,'quantity':1},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.data['quantity'],1)
        self.assertEqual(Product.objects.get(pk=self.product.pk).stock,self.product.stock - 1)
        response = self.client.post(f'/api/cart/addtocart/',{'product':self.product.pk,'quantity':1},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.data['quantity'],1)
        self.assertEqual(Product.objects.get(pk=self.product.pk).stock,self.product.stock - 1)

    def test_addtocart_with_same_product_decrease_product_stock(self):
        #adding to cart again should increase quantity
        response = self.client.post(f'/api/cart/addtocart/',{'product':self.product.pk,'quantity':13},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product.pk).stock,self.product.stock - 13)
        self.assertEqual(response.data['quantity'],13)
    
    def test_addtocart_without_quantity(self):
        response = self.client.post(f'/api/cart/addtocart/',{'product':self.product.pk},format='json')
        self.assertEqual(response.status_code,400)

    def test_addtocart_with_invalid_quantity(self):
        response = self.client.post(f'/api/cart/addtocart/',{'product':self.product.pk,'quantity':100},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product.pk).stock,0)
    #
    #
    #
    def test_removefromcart(self):
        # adding to cart
        cartResponse = self.client.post(f'/api/cart/addtocart/',{'product':self.product2.pk,'quantity':20},format='json')
        self.assertEqual(cartResponse.status_code,200)
        self.assertEqual(Product.objects.get(pk=self.product2.pk).stock,self.product2.stock - 20)
        self.assertEqual(cartResponse.data['quantity'],20)
        print(cartResponse.data)

        #removing from cart
        response = self.client.delete(f'/api/cart/removefromcart/',{'cartItem':cartResponse.data['id']},format='json')
        self.assertEqual(response.status_code,204)
        self.assertEqual(self.product2.stock,Product.objects.get(pk=self.product2.pk).stock)

    #


