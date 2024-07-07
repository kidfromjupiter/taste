from rest_framework import serializers

from apps.products.models import Product
from .models import Cart,CartItem
from apps.products.serializers import ProductSerializer
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        #reverse foreign key to cartitems added via fields option
        fields = ['value','cartitems']
        depth = 2

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

    def create(self,validated_data):
        return CartItem.objects.create(**validated_data)
class CartItemListSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = '__all__'
        
