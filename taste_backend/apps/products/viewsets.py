from django.shortcuts import render
from rest_framework import viewsets,filters,generics
from .serializers import ProductSerializer
from .models import Product
# Create your views here.
class ProductViewset(viewsets.ModelViewSet,generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = []
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    queryset = Product.objects.all()

    # def list(self, request, *args, **kwargs):
    #     pass
    # # pass