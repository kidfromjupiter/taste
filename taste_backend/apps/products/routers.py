from rest_framework import routers
from .viewsets import ProductViewset
router = routers.DefaultRouter()
router.register(r'products', ProductViewset,basename='products')
urlpatterns = router.urls
