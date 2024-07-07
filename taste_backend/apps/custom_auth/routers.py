from rest_framework import routers
from .viewsets import AuthViewset,UserViewset
router = routers.DefaultRouter()
router.register(r'auth', AuthViewset)
router.register(r'users', UserViewset)
urlpatterns = router.urls