from django.test import TestCase
from .models import User
from faker import Faker
class UserTestCase(TestCase):
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
    def setUp(self) -> None:
        self.user = User.objects.create_user(
            email = self.email,
            first_name = self.first_name,
            last_name = self.last_name,
            password = self.password
        )
    def test_user_creation(self):
        self.assertEqual(User.objects.count(),1)
        self.assertEqual(User.objects.first().email,self.email)
# Create your tests here.
