from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from .serializers import CartSerializer,CartItemSerializer
from rest_framework.decorators import action
from apps.custom_auth.models import User
from .models import Cart,CartItem
# Create your views here.
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    permission_classes = []

    @action(detail=False,methods=['post'])
    def addtocart(self,request,*args,**kwargs):
        # creating cart if not exist. creating cart item from product
        cart,_ = Cart.objects.get_or_create(user=User.objects.get(pk=request.data['user']))
        request.data['cart'] = cart.pk
        cartItem = CartItemSerializer(data=request.data)
        if cartItem.is_valid():
            try:
                cartItem.save()
                cartItem.instance.addtocart(quantity=request.data['quantity'] if 'quantity' in request.data else 1)
                return Response(status=status.HTTP_200_OK,data=cartItem.data)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data=cartItem.errors,status=status.HTTP_400_BAD_REQUEST)
            
    @action(detail=False,methods=['post'])
    def increasequantity(self,request,*args,**kwargs):
        # increasing quantity of cart item
        cartItem = CartItem.objects.get(pk=request.data['cartItem'])
        if cartItem.cart.user.pk != request.data['user']:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        cartItem.increase_quantity(request.data['quantity'] if 'quantity' in request.data else 1)
        
        return Response(status=status.HTTP_200_OK,data=CartItemSerializer(cartItem).data)
    
    @action(detail=False,methods=['post'])
    def decreasequantity(self,request,*args,**kwargs):
        # decreasing quantity of cart item
        cartItem = CartItem.objects.get(pk=request.data['cartItem'])
        if cartItem.cart.user.pk != request.data['user']:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        cartItem.decrease_quantity(request.data['quantity'] if 'quantity' in request.data else 1)
        return Response(status=status.HTTP_200_OK,data=CartItemSerializer(cartItem).data)