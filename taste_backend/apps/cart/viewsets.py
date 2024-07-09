from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response

from apps.products.models import Product
from .serializers import CartSerializer,CartItemSerializer,CartItemListSerializer
from rest_framework.decorators import action
from apps.custom_auth.models import User
from .models import Cart,CartItem
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    permission_classes = [IsAuthenticated]


    def list(self,request,*args,**kwargs):
        # listing cart items of the user
        cart = Cart.objects.get(user=request.user)
        return Response(status=status.HTTP_200_OK,data=CartSerializer(cart).data)

    
    @action(detail=False,methods=['post'])
    def addtocart(self,request,*args,**kwargs):
        # creating cart if not exist. creating cart item from product
        try:
            cart,created = Cart.objects.get_or_create(user=request.user)
            #setting the cart pk in data to pass into serializer
            request.data['cart'] = cart.pk
            cartItem = CartItemSerializer(data=request.data,partial=True)
            productInDB = Product.objects.get(pk=cartItem.initial_data['product'])
            #quantity cannot be larger than what is available. 
            request.data['quantity'] = min(productInDB.stock,request.data['quantity'])

            if cartItem.is_valid():
                try:
                    instance = cartItem.save()
                    
                    return Response(status=status.HTTP_200_OK,data={'id':instance.id,**cartItem.data})
                except Exception as e:
                    print("e0:",e)
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                print("e1:",cartItem.errors)
                print('isnt valid')
                return Response(status=status.HTTP_400_BAD_REQUEST,data=cartItem.errors)
        except Exception as e:
            print("e2:",e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
        
    @action(detail=False,methods=['post'])
    def decreasequantity(self,request,*args,**kwargs):
        # decreasing quantity of cart item
        cartItem = CartItem.objects.get(pk=request.data['cartItem'])
        product = Product.objects.get(pk=cartItem.product.pk)
        if cartItem.cart.user.pk != request.user.pk:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        quantity = request.data['quantity'] if 'quantity' in request.data else 1 
        cartItem.quantity  = min(0,cartItem.quantity - quantity)
        if cartItem.quantity == 0:
            cartItem.delete()
            return Response(status=status.HTTP_200_OK,)

        cartItem.save()
        product.decrease_stock_by(cartItem.quantity)

        return Response(status=status.HTTP_200_OK,data=CartItemListSerializer(cartItem).data)
    
    @action(detail=False,methods=['delete']) 
    def removefromcart(self,request,*args,**kwargs):
        # removing cart item from cart
        cartItem = CartItem.objects.get(pk=request.data['cartItem'])
        product = cartItem.product
        if cartItem.cart.user.pk != request.user.pk:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        product.stock += cartItem.quantity 
        product.save()        
        cartItem.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
