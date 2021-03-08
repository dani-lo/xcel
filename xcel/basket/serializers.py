from django.contrib.auth import get_user_model

from rest_framework import serializers

from xcel.basket.models import Basket
from xcel.order.serializers import OrderReadSerializer

User = get_user_model()

class FilteredListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(status='OPEN')
        return super(FilteredListSerializer, self).to_representation(data)


class BasketSerializer(serializers.ModelSerializer):

    orders = OrderReadSerializer(read_only=True, many=True)

    class Meta:
        model = Basket
        # list_serializer_class = FilteredListSerializer
        fields = ('id', 'status', 'user', 'instructions','orders', 'token', 'poid')

    # def create (self, validated_data):
    #     user = self.request.user
    #
    #     Basket.objects.filter(user=user, status=Basket.OPEN).update(status=Basket.STALE)
    #
    #     return Basket.objects.create(**validated_data)