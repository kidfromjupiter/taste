from rest_framework import routers
from .viewsets import CartViewSet
router = routers.DefaultRouter()
router.register(r'cart', CartViewSet)
