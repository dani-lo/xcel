from xcel.order.models import Order, LocalOrder
from xcel.account.models import LocalAccount
from xcel.product.models import Product
from xcel.basket.models import Basket

def set_local_basket_payment_token () :
  return

def basket_orders (bid):
    return Order.objects.filter(basket_id = bid, deleted = None)

def basket_total (bid):
    b_tot = 0
    b_orders = basket_orders(bid)

    for order in b_orders:
        order_tot = order.unit_price * order.quantity

        b_tot = b_tot + order_tot

    return str(b_tot)

def set_basket_token (bid, token):

    try :
        basket = Basket.objects.get(id = bid)
        print(basket.id)
        print(basket.status)
        basket.token = token

        basket.save()

        return 1
    except :
        return 0

def set_basket_paid (poid):

    try :
        basket = Basket.objects.get(poid = poid)
        basket.status = Basket.PAID

        basket.save()

        return basket
    except :
        return 0

def set_basket_paypal_order (token, poid):

    try :
        basket = Basket.objects.get(token = token)
        basket.poid = poid

        basket.save()

        return basket
    except :
        return 0

def build_checkout_request_body (b_id, b_total, user_detail):
    return {
        "intent": "CAPTURE",
        "application_context": {
            "brand_name": "Xcel Organic Creams",
            "landing_page": "BILLING",
            "shipping_preference": "SET_PROVIDED_ADDRESS",
            "user_action": "PAY_NOW",
            "return_url": "http://ixcel-nature.co.uk/payment_return",
        },
        "purchase_units": [
            {
                "reference_id": "XCEL_BASKET_%s" % (b_id),
                "description": "Xcel",
                "custom_id": "CUST-HighFashions",
                "soft_descriptor": "Organic Creams",
                "amount": {
                    "currency_code": "GBP",
                    "value": b_total,
                },
                "shipping": {
                    "method": "Royal mail",
                    "address": {
                        "name": {
                            "full_name": user_detail.firstname,
                            "surname": user_detail.lastname
                        },
                        "address_line_1": user_detail.address_line_1,
                        "address_line_2": user_detail.address_line_2,
                        "postal_code": user_detail.postcode,
                        "admin_area_1": user_detail.city,
                        "admin_area_2": user_detail.city,
                        "country_code": 'GB'
                    }
                }
            }
        ]
    }

###################### LOCAL #############


def create_local_orders (xcelid, p_token, orders, user_email, checkout_total) :

  for order in orders:

    order_product = Product.objects.get(id = int(order['product_id']))

    LocalOrder.objects.create(
      xcelid = xcelid,
      user_email= user_email,
      unit_price =  order['unit_price'],
      quantity = order['quantity'],
      product = order_product,
      token = p_token,
      totalcheckout = checkout_total
    )

def set_local_orders_paid (poid) :
  orders = LocalOrder.objects.filter(poid = poid)

  already_paid = False

  for order in orders :
    if order.status == LocalOrder.PAID :
      already_paid = True
    else :
      order.status = LocalOrder.PAID
      order.save()

  if already_paid :
    return 0

  return 1

def set_local_account_poid (paypal_token, poid) :
  account = LocalAccount.objects.get(token = paypal_token)
  account.poid = poid 
  account.save()

def set_local_orders_poid (paypal_token, poid) :
  orders = LocalOrder.objects.filter(token = paypal_token)

  for order in orders :
    order.poid = poid
    order.save()


def build_local_checkout_request_body (xcelid, b_total, ship_detail) :

  return {
        "intent": "CAPTURE",
        "application_context": {
            "brand_name": "Xcel Organic Creams",
            "landing_page": "BILLING",
            "shipping_preference": "SET_PROVIDED_ADDRESS",
            "user_action": "PAY_NOW",
            "return_url": "http://ixcel-nature.co.uk/payment_return",
        },
        "purchase_units": [
            {
                "reference_id": "XCEL_BASKET_%s" % xcelid,
                "description": "Xcel",
                "custom_id": "CUST-HighFashions",
                "soft_descriptor": "Organic Creams",
                "amount": {
                    "currency_code": "GBP",
                    "value": b_total,
                },
                "shipping": {
                    "method": "Royal mail",
                    "address": {
                        "name": {
                            "full_name": ship_detail['firstname'],
                            "surname": ship_detail['lastname']
                        },
                        "address_line_1": ship_detail['address_line_1'],
                        "address_line_2": ship_detail['address_line_2'],
                        "postal_code": ship_detail['postcode'],
                        "admin_area_1": ship_detail['city'],
                        "admin_area_2": ship_detail['city'],
                        "country_code": 'GB'
                    }
                }
            }
        ]
    }