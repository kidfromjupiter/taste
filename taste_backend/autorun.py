from apps.products.models import Product
from faker import Faker
from djmoney.money import Money

# create 50 products
fake = Faker()
for i in range(50):
    product = Product.objects.create(
        name = fake.name(),
        description = fake.text(),
        stock = fake.random_int(),
        domestic_price = Money(fake.random_int(),'LKR') ,
        international_price = Money(fake.random_int(),'USD') ,
        image = 'https://picsum.photos/200/300',
        created_at = fake.date_time(),
    )
    product.save()