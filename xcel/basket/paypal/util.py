from xcel.order.models import Order

def basket_total (bid):
    b_tot = 0
    b_orders = Order.objects.filter(basket_id = bid, deleted = None)

    for order in b_orders:
        order_tot = order.unit_price * order.quantity

        b_tot = b_tot + order_tot

    return str(b_tot)

def build_checkout_request_body (b_id, b_total):
    return {
        "intent": "CAPTURE",
        "application_context": {
            "brand_name": "Xcel Organic Creams",
            "landing_page": "BILLING",
            "shipping_preference": "SET_PROVIDED_ADDRESS",
            "user_action": "PAY_NOW",
            "return_url": "http://18.236.204.125/checkout/return",
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
                            "full_name": "Foobar",
                            "surname": "Footsy"
                        },
                        "address_line_1": "123 Townsend St",
                        "admin_area_2": "London",
                        "admin_area_1": "London",
                        "postal_code": "N77HR",
                        "country_code": "GB"
                    }
                }
            }
        ]
    }