from django.core.exceptions import ObjectDoesNotExist, ValidationError
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
    product = serializers.UUIDField()
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = CartItem
        fields = ['id','product','quantity','cart']
    def validate_product(self,value):
        #dont raise error if product exists
        try:
            return Product.objects.get(id=value)
        except Exception as e:
            return ValidationError(f'{e}')
    def create(self,validated_data):
        try:
            item = CartItem.objects.get(cart=validated_data.get('cart',None),product=validated_data.get("product",None))
            prev_quantity = item.quantity
            if prev_quantity != validated_data.get('quantity',None):
                item.quantity = validated_data.get("quantity",None)
                product = Product.objects.get(id=item.product)
                if prev_quantity > item.quantity :
                    #stock should be increased. quantity was decreased
                    product.increase_stock_by(prev_quantity - item.quantity)
                else:
                    #stock should be decreased. quantity was increased
                    product.decrease_stock_by( item.quantity - prev_quantity )
                item.save()
            return item
        except ObjectDoesNotExist:
            product = validated_data.get("product",None)
            product.decrease_stock_by(validated_data.get('quantity',None))
            return CartItem.objects.create(cart=validated_data.get('cart',None),product=validated_data.get("product",None),quantity=validated_data.get('quantity',None))
        except Exception as e:
            print("e4:",e)
        


    def save(self,**kwargs):
        return self.create(self.validated_data)

class CartItemListSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = '__all__'
        
