from pprint import pprint as pp

from django.shortcuts import render, redirect

from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from xcel.basket.models import Basket
from xcel.basket.serializers import BasketSerializer

from xcel.basket.paypal import util as paypal_util
from xcel.basket.paypal.paypal_client import OrderClient
# from xcel.account

from xcel.order.models import Order

class BasketDetail(generics.ListCreateAPIView):
    serializer_class = BasketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):

        if serializer.is_valid():
            user = self.request.user

            Basket.objects.filter(user=user, status=Basket.OPEN).update(status=Basket.STALE)

            serializer.save(user=self.request.user)

    def get_queryset(self, *args, **kwargs):
        b = Basket.objects.all().filter(user=self.request.user, status = 'OPEN')
        b.orders = []
        return b

    def list(self, request, *args, **kwargs):
        bkt = Basket.objects.all().filter(user=self.request.user, status = 'OPEN').values()

        if (bkt and bkt[0]) :
            bkt = bkt[0]

            bkt_id = bkt.get('id')
            status = bkt.get('status')
            poid = bkt.get('poid')
            token =  bkt.get('token')

            orders = Order.objects.all().filter(basket_id = bkt_id, deleted = None).values()

            return Response({
                'id': bkt_id,
                'orders': orders,
                'total': paypal_util.basket_total(bkt_id),
                'status': status,
                'token': token,
                'poid': poid
            })

        return Response({ 'orders': []})

    def put(self, request, *args, **kwargs):
        poid = request.data.get('poid', 0)

        print('=========')
        print('poid', poid)
        basket = paypal_util.set_basket_paid(poid)
        print(basket)
        if basket == 0 :

            return Response({})

        return Response({
            'id': basket.id,
            'status': basket.status,
            'token': basket.token,
            'poid': basket.poid
        })




class PrepareBasket(APIView) :

    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):

        user = user=self.request.user
        pk = kwargs.get('pk')

        total = paypal_util.basket_total(pk)
        order_body = paypal_util.build_checkout_request_body(pk, total, user.account)

        # try :

        order = OrderClient()

        paypal_response = order.create_order(order_body, debug=True)

        print('------------------------ GOT RESPONSE! ---------------------------')
        print(paypal_response.status_code)
        print(paypal_response.result.status)
        print(paypal_response.result.id)
        print(paypal_response.result.intent)

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

        print('BIDDDD', pk)
        print(paypal_response.result.id)
        set_basket_token_result = paypal_util.set_basket_token(pk, paypal_response.result.id)
        print(set_basket_token_result)
        return Response(checkout_data)

        # except :
        #     return Response({'error': 'Chekout URl could not be prepared'})

def payment_return(request):
    print('-------------------- return --------------------')
    token = request.GET['token']

    order = OrderClient()
    order_id = order.capture_order(token)



    if order_id != 0:
        paypal_util.set_basket_paypal_order(token, order_id)

        return redirect(f'/payment_confirm/{ order_id }')

    else :
        return redirect(f'/payment_confirm/0')


def payment_confirm (request, pid):
    return render(request, f'payment_confirm.html')