from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from xcel.basket.models import Basket
from xcel.basket.serializers import BasketSerializer

from xcel.basket.paypal import util as paypal_util
from xcel.basket.paypal.paypal_client import CreateOrder


class BasketDetail(generics.ListCreateAPIView):
    serializer_class = BasketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):

        if serializer.is_valid():
            user = self.request.user

            Basket.objects.filter(user=user, status=Basket.OPEN).update(status=Basket.STALE)

            serializer.save(user=self.request.user)

    def get_queryset(self, *args, **kwargs):
        return Basket.objects.all().filter(user=self.request.user, status = 'OPEN')

class PrepareBasket(APIView) :

    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):

        pk = kwargs.get('pk')

        total = paypal_util.basket_total(pk)
        order_body = paypal_util.build_checkout_request_body(pk, total)

        order = CreateOrder()

        paypal_response = order.create_order(order_body, debug=True)

        checkout_data = {}

        checkout_data['status_code'] = paypal_response.status_code
        checkout_data['result_status'] = paypal_response.result.status
        checkout_data['result_id'] = paypal_response.result.id
        checkout_data['result_intent'] = paypal_response.result.intent
        checkout_data['links'] = []

        for link in paypal_response.result.links:
            checkout_data['links'].append({
                'rel': link.rel,
                'href': link.href,
                'method': link.method
            })

        checkout_data['currency_code'] = paypal_response.result.purchase_units[0].amount.currency_code
        checkout_data['amount'] = paypal_response.result.purchase_units[0].amount.value

        return Response(checkout_data)

