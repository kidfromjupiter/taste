from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        """ Create a new user profile """
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):
        """ Create a new superuser profile """
        user = self.create_user(email,name, password)
        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)

        return user

class User(AbstractUser):
    """ Custom user model that supports using email instead of username """
    email =models.EmailField( max_length=254,unique=True)
    username = None
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['first_name']
    def __str__(self):
        return self.username