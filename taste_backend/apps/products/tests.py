from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Product
from faker import Faker
from djmoney.money import Money
# Create your tests here.
class ProductCreationTestCase(APITestCase,TestCase):
    fake = Faker()
    name = 'test product'
    description = fake.text()
    stock = 10
    domestic_price = 100
    international_price = 100
    image = 'https://picsum.photos/200/300'
    

    def setUp(self) -> None:
        pass

    def test_product_creation(self):
        response = self.client.post('/api/products/',{
            'name': self.name,
            'description': self.description,
            'stock': self.stock,
            'domestic_price': self.domestic_price,
            'international_price': self.international_price,
            'image': self.image,
        })
        self.assertEqual(Product.objects.count(),1)
        self.assertEqual(Product.objects.first().name,'test product')
        self.assertEqual(Product.objects.first().description,self.description)
        self.assertEqual(Product.objects.first().stock,self.stock)
        self.assertEqual(Product.objects.first().image,self.image)
        self.assertEqual(Product.objects.first().domestic_price,Money(100,'LKR'))
        self.assertEqual(Product.objects.first().international_price,Money(100,'USD'))
    

class ProductTestCase(APITestCase,TestCase):
    fake = Faker()
    name = 'something else'
    description = fake.text()
    stock = 10
    domestic_price = Money(100,'LKR')
    international_price = Money(100,'LKR')
    image = 'https://picsum.photos/200/300'
    
    def setUp(self) -> None:
        self.product = Product.objects.create(
            name = self.name,
            description = self.fake.text(),
            stock = 10,
            domestic_price = 100,
            international_price = 100,
            image = 'https://picsum.photos/200/300',
        )
        self.product = Product.objects.create(
            name = 'other stuff',
            description = self.fake.text(),
            stock = 10,
            domestic_price = 100,
            international_price = 100,
            image = 'https://picsum.photos/200/300',
        )
        self.product = Product.objects.create(
            name = self.name,
            description = self.description,
            stock = self.stock,
            domestic_price = self.domestic_price,
            international_price = self.international_price,
            image = self.image,
        )

    def test_search(self):
        response = self.client.get("/api/products/?search=something")
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['name'],self.name)

    