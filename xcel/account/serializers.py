from rest_framework import serializers
from .models import Account


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['firstname', 'lastname', 'address_line_1', 'address_line_2', 'country', 'postcode']