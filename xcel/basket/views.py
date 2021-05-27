import time

from pprint import pprint as pp
from django.db import models

from django.shortcuts import render, redirect

from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from xcel.basket.models import Basket
from xcel.basket.serializers import BasketSerializer

from xcel.basket.paypal import util as paypal_util
from xcel.basket.paypal.paypal_client import OrderClient
from xcel.basket.paypal import confirm as paypal_confirm

from xcel.account.models import LocalAccount

from xcel.order.models import CustomUser, LocalOrder, Order

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

class LocalBasketDetail(generics.ListCreateAPIView):
    serializer_class = BasketSerializer

    def put(self, request, *args, **kwargs):

        print('========= LocalBasketDetail :: PUT')

        poid = request.data.get('poid', 0)

        orders = LocalOrder.objects.filter(poid = poid)
        account = LocalAccount.objects.get(poid = poid)
        total = orders[0]['total']

        print('>>>>>> account')
        print(account)
        print('>>>>>> orders')
        print(orders)
        print('>>>>>> total')
        print(total)
        print('>>>>>> poid', poid)
        
        print('NOW:: set_local_orders_paid')
        paypal_util.set_local_orders_paid(poid)
        print('NOW:: send_confirmation_basket_payment')
        paypal_confirm.send_confirmation_basket_payment(account, orders, total)
        # print(basket)
        # if basket == 0 :

        #     return Response({})
        
        print ('RETURN RESPONSE')
        
        return Response({
            'id': account.xcelid,
            'status': 'PAID',
            'token': account.token,
            'poid': account.poid
        })



class LocalCheckout(APIView) :

    def post(self, request, *args, **kwargs):
      print('--------- 222 --------------')
      print(request.data)

      ship_detail=request.data['shipDetail']
      total = request.data['total']
      orders = request.data['orders']



      ts =  "%s" % time.time()
      xcelid = ts.replace('.', '')
      # pk = kwargs.get('pk')

      
      # total = paypal_util.basket_total(pk)
      order_body = paypal_util.build_local_checkout_request_body(xcelid, total, ship_detail)

      # # try :

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

      token = paypal_response.result.id

      print(paypal_response.result.id)
      paypal_util.create_local_orders(xcelid, token, orders, ship_detail['email'], total)
      
      LocalAccount.objects.create(
        email=ship_detail['email'],
        xcelid = xcelid,
        firstname = ship_detail['firstname'],
        lastname = ship_detail['lastname'],
        address_line_1 = ship_detail['address_line_1'],
        address_line_2 = ship_detail['address_line_2'],
        city = ship_detail['city'],
        postcode = ship_detail['postcode'],
        poid = "",
        token=token
      )

      # paypal_confirm.send_confirmation_basket_payment(ship_detail, orders, total)

      return Response(checkout_data)

def payment_return(request):
    print('-------------------- return --------------------')
    token = request.GET['token']

    order = OrderClient()
    order_id = order.capture_order(token)

    if order_id != 0:
        paypal_util.set_local_orders_poid(token, order_id)
        paypal_util.set_local_account_poid(token, order_id)

       

        return redirect(f'/payment_confirm/{ order_id }')

    else :
        return redirect('/payment_confirm/0')


def payment_confirm (request, pid):
    return render(request, f'payment_confirm.html')