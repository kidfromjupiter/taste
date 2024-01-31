from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from .serializers import CartSerializer,CartItemSerializer
from rest_framework.decorators import action
from apps.custom_auth.models import User
from .models import Cart,CartItem
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    permission_classes = [IsAuthenticated]

    @action(detail=False,methods=['post'])
    def addtocart(self,request,*args,**kwargs):
        # creating cart if not exist. creating cart item from product
        cart,exists = Cart.objects.get_or_create(user=request.user)
        request.data['cart'] = cart.pk
        cartItem = CartItemSerializer(data=request.data)
        if cartItem.is_valid():
            try:
                cartItem.save()
                cartItem.instance.addtocart(quantity=request.data['quantity'] if 'quantity' in request.data else 1)
                return Response(status=status.HTTP_200_OK,data=cartItem.data)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        #cart item already exists
        else:
            cartItem = CartItem.objects.get(product=request.data['product'],cart=cart)
            request.data['cartItem'] = cartItem.pk
            self.increasequantity(request,*args,**kwargs)
            cartItem = CartItem.objects.get(product=request.data['product'],cart=cart)
            return Response(status=status.HTTP_200_OK,data=CartItemSerializer(cartItem).data)
            
    @action(detail=False,methods=['post'])
    def increasequantity(self,request,*args,**kwargs):
        # increasing quantity of cart item
        cartItem = CartItem.objects.get(pk=request.data['cartItem'])
        if cartItem.cart.user.pk != request.user.pk:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        cartItem.increase_quantity(request.data['quantity'] if 'quantity' in request.data else 1)
        
        return Response(status=status.HTTP_200_OK,data=CartItemSerializer(cartItem).data)
    
    @action(detail=False,methods=['post'])
    def decreasequantity(self,request,*args,**kwargs):
        # decreasing quantity of cart item
        cartItem = CartItem.objects.get(pk=request.data['cartItem'])
        if cartItem.cart.user.pk != request.user.pk:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        cartItem.decrease_quantity(request.data['quantity'] if 'quantity' in request.data else 1)
        if cartItem.id == None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_200_OK,data=CartItemSerializer(cartItem).data)
    
    @action(detail=False,methods=['delete']) 
    def removefromcart(self,request,*args,**kwargs):
        # removing cart item from cart
        cartItem = CartItem.objects.get(pk=request.data['cartItem'])
        if cartItem.cart.user.pk != request.user.pk:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        cartItem.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
