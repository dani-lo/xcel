from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
from paypalcheckoutsdk.orders import OrdersCaptureRequest, OrdersCreateRequest

from django.conf import settings

import sys

class PayPalClient:
    def __init__(self):
        self.client_id = settings.PAYPAL_CLIENT_ID
        self.client_secret = settings.PAYPAL_SECRET

        """Set up and return PayPal Python SDK environment with PayPal access credentials.
           This sample uses SandboxEnvironment. In production, use LiveEnvironment."""

        self.environment = SandboxEnvironment(client_id=self.client_id, client_secret=self.client_secret)

        """ Returns PayPal HTTP client instance with environment that has access
            credentials context. Use this instance to invoke PayPal APIs, provided the
            credentials have access. """
        self.client = PayPalHttpClient(self.environment)

    def object_to_json(self, json_data):
        """
        Function to print all json data in an organized readable manner
        """
        result = {}
        if sys.version_info[0] < 3:
            itr = json_data.__dict__.iteritems()
        else:
            itr = json_data.__dict__.items()
        for key,value in itr:
            # Skip internal attributes.
            if key.startswith("__"):
                continue
            result[key] = self.array_to_json_array(value) if isinstance(value, list) else\
                        self.object_to_json(value) if not self.is_primittive(value) else\
                         value
        return result;
    def array_to_json_array(self, json_array):
        result =[]
        if isinstance(json_array, list):
            for item in json_array:
                result.append(self.object_to_json(item) if  not self.is_primittive(item) \
                              else self.array_to_json_array(item) if isinstance(item, list) else item)
        return result

    def is_primittive(self, data):
        return isinstance(data, str) or isinstance(data, int)

class OrderClient(PayPalClient):

  #2. Set up your server to receive a call from the client
  """ This is the sample function to create an order. It uses the
    JSON body returned by buildRequestBody() to create an order."""

  def create_order(self, order_body, debug=False):
    request = OrdersCreateRequest()
    request.prefer('return=representation')
    #3. Call PayPal to set up a transaction
    request.request_body(order_body)
    response = self.client.execute(request)
    if debug:
      print('Status Code: ', response.status_code)
      print( 'Status: ', response.result.status)
      print( 'Order ID: ', response.result.id)
      print( 'Intent: ', response.result.intent)
      print ('Links:')
      for link in response.result.links:
        print('\t{}: {}\tCall Type: {}'.format(link.rel, link.href, link.method))
      print ('Total Amount: {} {}'.format(response.result.purchase_units[0].amount.currency_code,
                         response.result.purchase_units[0].amount.value))

    return response


  def capture_order(self, token, debug=False):
    request = OrdersCaptureRequest(token)

    try :
        response = self.client.execute(request)
        order_id = response.result.id

        return order_id

    except IOError as ioe:

      return 0


