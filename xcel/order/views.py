from datetime import datetime
import time
from xcel.account.models import LocalAccount

from xcel.order.models import LocalOrder, Order
from xcel.order.serializers import OrderWriteSerializer, UserSerializer

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth import login, logout, authenticate, get_user_model
from django.shortcuts import render
from django.forms.models import model_to_dict

User = get_user_model()

class OrderList(generics.ListCreateAPIView):
    serializer_class = OrderWriteSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        print(serializer.validated_data)
        serializer.save()

    def get_queryset(self, *args, **kwargs):
        return Order.objects.filter(user=self.request.user)


class OrderDetail(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderWriteSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        timestamp = datetime.now()

        instance.deleted = timestamp
        instance.save()

        return Response(status.HTTP_200_OK)



class UserProfile(APIView):

    #permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        serializer = UserSerializer(user)
        return Response({'user': serializer.data})


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user_email = self.request.data['email']
            user_password = self.request.data['password']

            User.objects.create_user(user_email, user_password)

            return Response(status=status.HTTP_200_OK)

class UserLogin(APIView):
    #permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        data = request.data

        print(data)
        email = data.get('email', None)
        password = data.get('password', None)

        user = authenticate(email=email, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)

                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UserLogout(APIView):
    #permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        logout(request)

        return Response(status=status.HTTP_200_OK)


# class UserLogin(APIView):
#
#     def post(self, request):
#         login(request)
#
#         return Response(status=status.HTTP_200_OK)


class LocalOrdersList(APIView):

    def get(self, request, format=None):

      orders = LocalOrder.objects.all()

      arr_orders = []

      for order in orders:

        obj_order = model_to_dict(order)
        print('>>>>>>>>>>>>>>>>>')
        print(order.xcelid)
        try:
          order_account = model_to_dict(LocalAccount.objects.get(xcelid = order.xcelid))
        except :
          order_account = {}
        
        obj_order['account'] = order_account
        
        arr_orders.append(obj_order)
        
      return Response(arr_orders)


def local_orders (request):
    return render(request, f'payment_confirm.html')