import os

import boto3

from botocore.exceptions import ClientError

from xcel.order.models import Order, LocalOrder

from xcel.product.models import Product

def build_html_body (user_data, orders, total, for_client) :

  if for_client:

    html_head = "<html><head></head><body><h1>Ixcel Nature confirmation</h1><p>We received you order and will deliver it to you soon: please see the details provided for the order</p>"
  else :
    html_head = "<html><head></head><body><h1>Ixcel Nature confirmation</h1><p>An order was placed on the website: see details</p>"

  if for_client:

    html_user = ['<div><h2>Your Details</h2>']
  else :
    html_user = ['<div><h2>User Details</h2>']


  html_user = ['<div><h2>User Details</h2>']
  html_user.append('<p>%s</p>' %user_data.firstname)
  html_user.append('<p>%s</p>' %user_data.lastname)
  html_user.append('<p>%s</p>' %user_data.address_line_1)
  html_user.append('<p>%s</p>' %user_data.address_line_2)
  html_user.append('<p>%s</p>' %user_data.city)
  html_user.append('<p>%s</p>' %user_data.postcode)
  html_user.append('</div>')

  html_orders = ['<div><h2>Products Ordered</h2>']

  for order in orders :
    product = Product.objects.get(id = order.product_id)    
    html_orders.append('<p>%s (%s)</p>' %(product.name, order.quantity))
  html_orders.append('</div>')

  html_total = '<h3>Total %s</h3>' %total

  html_foot = "</body></html>"

  return html_head + ''.join(html_user) + ''.join(html_orders) + html_total + html_foot


def build_html_body_dev (user_data, orders, total, for_client) :

  if for_client:

    html_head = "<html><head></head><body><h1>Ixcel Nature confirmation</h1><p>We received you order and will deliver it to you soon: please see the details provided for the order</p>"
  else :
    html_head = "<html><head></head><body><h1>Ixcel Nature confirmation</h1><p>An order was placed on the website: see details</p>"

  if for_client:

    html_user = ['<div><h2>Your Details</h2>']
  else :
    html_user = ['<div><h2>User Details</h2>']


  html_user = ['<div><h2>User Details</h2>']
  html_user.append('<p>%s</p>' %user_data['firstname'])
  html_user.append('<p>%s</p>' %user_data['lastname'])
  html_user.append('<p>%s</p>' %user_data['address_line_1'])
  html_user.append('<p>%s</p>' %user_data['address_line_2'])
  html_user.append('<p>%s</p>' %user_data['city'])
  html_user.append('<p>%s</p>' %user_data['postcode'])
  html_user.append('</div>')

  html_orders = ['<div><h2>Products Ordered</h2>']

  for order in orders :
    product = Product.objects.get(id = order['product_id'])    
    html_orders.append('<p>%s (%s)</p>' %(product.name, order['quantity']))
  html_orders.append('</div>')

  html_total = '<h3>Total %s</h3>' %total

  html_foot = "</body></html>"

  return html_head + ''.join(html_user) + ''.join(html_orders) + html_total + html_foot


def send_user_confirmation_basket_payment (user_data, orders, total) :

  ACCESS_KEY = os.environ.get('AWS_KEY_ID')
  SECRET_KEY = os.environ.get('AWS_KEY_SECRET')
  AWS_REGION = "us-west-2"

  client = boto3.client('ses', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY, region_name=AWS_REGION)

  # Replace sender@example.com with your "From" address.
  # This address must be verified with Amazon SES.
  SENDER = "Ixcel Nature <hello@ixcel-nature.co.uk>"

  # Replace recipient@example.com with a "To" address. If your account 
  # is still in the sandbox, this address must be verified.
  RECIPIENT = user_data.email

  # If necessary, replace us-west-2 with the AWS Region you're using for Amazon SES.
  

  # The subject line for the email.
  SUBJECT = "Ixcel Nature order confirmation"

  # The email body for recipients with non-HTML email clients.
  # BODY_TEXT = ("Amazon SES Test (Python)\r\n"
  #             "This email was sent with Amazon SES using the "
  #             "AWS SDK for Python (Boto)."
  #             )
  BODY_TEXT = "Ixcel Nature order confirmation"

  BODY_HTML = build_html_body(user_data, orders, total, True)          

  # The character encoding for the email.
  CHARSET = "UTF-8"

  # Create a new SES resource and specify a region.
  
  # Try to send the email.
  try:
      #Provide the contents of the email.
      response = client.send_email(
          Destination={
              'ToAddresses': [
                  RECIPIENT,
              ],
          },
          Message={
              'Body': {
                  'Html': {
                      'Charset': CHARSET,
                      'Data': BODY_HTML,
                  },
                  'Text': {
                      'Charset': CHARSET,
                      'Data': BODY_TEXT,
                  },
              },
              'Subject': {
                  'Charset': CHARSET,
                  'Data': SUBJECT,
              },
          },
          Source=SENDER,
      )
  # Display an error if something goes wrong.	
  except ClientError as e:
      print(e.response['Error']['Message'])
  else:
      print("Email sent! Message ID:"),
      print(response['MessageId'])


def send_company_confirmation_new_order (user_data, orders, total) :

  ACCESS_KEY = os.environ.get('AWS_KEY_ID')
  SECRET_KEY = os.environ.get('AWS_KEY_SECRET')
  AWS_REGION = "us-west-2"

  client = boto3.client('ses', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY, region_name=AWS_REGION)

  # Replace sender@example.com with your "From" address.
  # This address must be verified with Amazon SES.
  SENDER = "Ixcel Nature <hello@ixcel-nature.co.uk>"

  # Replace recipient@example.com with a "To" address. If your account 
  # is still in the sandbox, this address must be verified.
  RECIPIENT = 'hello.ixcelnature@gmail.com' #user_data['email']

  # If necessary, replace us-west-2 with the AWS Region you're using for Amazon SES.
  

  # The subject line for the email.
  SUBJECT = "Ixcel Nature new order"

  # The email body for recipients with non-HTML email clients.
  # BODY_TEXT = ("Amazon SES Test (Python)\r\n"
  #             "This email was sent with Amazon SES using the "
  #             "AWS SDK for Python (Boto)."
  #             )
  BODY_TEXT = "Ixcel Nature order confirmation"

  BODY_HTML = build_html_body(user_data, orders, total, False)          

  # The character encoding for the email.
  CHARSET = "UTF-8"

  # Create a new SES resource and specify a region.
  
  # Try to send the email.
  try:
      #Provide the contents of the email.
      response = client.send_email(
          Destination={
              'ToAddresses': [
                  RECIPIENT,
              ],
          },
          Message={
              'Body': {
                  'Html': {
                      'Charset': CHARSET,
                      'Data': BODY_HTML,
                  },
                  'Text': {
                      'Charset': CHARSET,
                      'Data': BODY_TEXT,
                  },
              },
              'Subject': {
                  'Charset': CHARSET,
                  'Data': SUBJECT,
              },
          },
          Source=SENDER,
      )
  # Display an error if something goes wrong.	
  except ClientError as e:
      print(e.response['Error']['Message'])
  else:
      print("Email sent! Message ID:"),
      print(response['MessageId'])