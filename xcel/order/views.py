from xcel.order.models import Order
from xcel.order.serializers import OrderWriteSerializer, UserSerializer

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth import login, logout, authenticate, get_user_model

User = get_user_model()

class OrderList(generics.ListCreateAPIView):
    serializer_class = OrderWriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        print(serializer.validated_data)
        serializer.save()

    def get_queryset(self, *args, **kwargs):
        return Order.objects.all()#.filter(user=self.request.user)

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderWriteSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserProfile(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        serializer = UserSerializer(user)
        return Response({'user': serializer.data})


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserLogin(APIView):

    def post(self, request, format=None):
        data = request.data

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
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        logout(request)

        return Response(status=status.HTTP_200_OK)


# class UserLogin(APIView):
#
#     def post(self, request):
#         login(request)
#
#         return Response(status=status.HTTP_200_OK)
