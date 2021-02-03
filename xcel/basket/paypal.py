
import requests
import pprint

# Construct a request object and set desired parameters
# Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders

def create_checkout () :

    # request = OrdersCreateRequest()
    #
    # request.prefer('return=representation')

    req_url = "https://api.sandbox.paypal.com/v2/checkout/orders"
    req_headers = {}
    req_headers["Content-Type"] = "application/json"
    req_headers["Authorization"] = "Bearer Access-Token"
    req_body = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": "100.00"
                }
            }
        ]
    }

    x = requests.post(req_url, data=req_body, headers = req_headers)
    print('psadsapdsapdsapdsapdpsapdsadsa-------------------------')
    print(x.text)


    # # req_data ={
    # #         "intent": "CAPTURE",
    # #         "purchase_units": [
    # #             {
    # #                 "amount": {
    # #                     "currency_code": "USD",
    # #                     "value": "100.00"
    # #                 }
    # #             }
    # #         ]
    # #     }
    # try:
    #     # Call API with your client and get a response for your call
    #     response = client.execute(request)
    #     print ('Order With Complete Payload:')
    #     print ('Status Code:', response.status_code)
    #     print ('Status:', response.result.status)
    #     print ('Order ID:', response.result.id)
    #     print ('Intent:', response.result.intent)
    #     print ('Links:')
    #     for link in response.result.links:
    #         print('\t{}: {}\tCall Type: {}'.format(link.rel, link.href, link.method))
    #         print ('Total Amount: {} {}'.format(response.result.purchase_units[0].amount.currency_code))
    #         response.result.purchase_units[0].amount.value)
    #         # If call returns body in response, you can get the deserialized version from the result attribute of the response
    #         order = response.result
    #         print (order)
    # except IOError as ioe:
    #     print (ioe)
    #     if isinstance(ioe, HttpError):
    #         # Something went wrong server-side
    #         print (ioe.status_code)