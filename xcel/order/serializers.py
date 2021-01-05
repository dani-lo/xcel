from rest_framework import serializers
from xcel.order.models import Order
from xcel.product.models import Product
from django.contrib.auth.models import User


class OrderSerializer(serializers.ModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.id')
    product = serializers.PrimaryKeyRelatedField(many = False, queryset=Product.objects.all())
    class Meta:
        model = Order
        fields = ('id', 'status', 'owner', 'product', 'quantity', 'instructions', 'unit_price')


class UserSerializer(serializers.ModelSerializer):

    orders = serializers.PrimaryKeyRelatedField(many=True, queryset=Order.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'orders']