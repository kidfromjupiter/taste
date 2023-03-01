from django.shortcuts import render
from rest_framework import viewsets,filters,generics,pagination
from .serializers import ProductSerializer
from .models import Product
# Create your views here.

class CustomPagination(pagination.PageNumberPagination):
    page_size = 10


class ProductViewset(viewsets.ModelViewSet,generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = []
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name','domestic_price','international_price','created_at']
    queryset = Product.objects.all()
    pagination_class = CustomPagination
    

    # def list(self, request, *args, **kwargs):
    #     pass
    # # pass