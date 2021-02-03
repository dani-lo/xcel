from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from xcel.order.models import Order
from xcel.basket.models import Basket
from xcel.product.models import Product
from xcel.account.serializers import AccountSerializer

from django.contrib.auth import get_user_model

User = get_user_model()

class FilteredListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(status='OPEN')
        return super(FilteredListSerializer, self).to_representation(data)


class OrderReadSerializer(serializers.ModelSerializer):

    product = serializers.PrimaryKeyRelatedField(many = False, queryset=Product.objects.all())

    class Meta:
        model = Order
        # list_serializer_class = FilteredListSerializer
        fields = ('id', 'product', 'quantity', 'unit_price')

class OrderWriteSerializer(serializers.ModelSerializer):

    product = serializers.PrimaryKeyRelatedField(many = False, queryset=Product.objects.all())
    basket = serializers.PrimaryKeyRelatedField(many=False, queryset=Basket.objects.all())

    class Meta:
        model = Order
        # list_serializer_class = FilteredListSerializer
        fields = ('id', 'product', 'basket', 'quantity', 'unit_price')


class UserSerializer(serializers.ModelSerializer):

    account = AccountSerializer(read_only=True, many=False)

    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ['id', 'password', 'email', 'account']

    # def create(self, validated_data):
    #     password = validated_data.pop('password')
    #     user = User(**validated_data)
    #     user.set_password(password)
    #     user.save()
    #
    #     return user
