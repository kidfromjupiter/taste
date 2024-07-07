from .base import *

DEBUG = True

ALLOWED_HOSTS = ['65.2.13.143']

#Production database
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.postgresql_psycopg2',
    'NAME': 'tastedb',
    'USER': 'postgres',
    'PASSWORD': 'portfolio',
    'HOST': 'portfoliodb.cn6iuk6sw39q.ap-south-1.rds.amazonaws.com',
    'PORT': '5432',
  }
}