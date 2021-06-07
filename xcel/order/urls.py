import os

from dotenv import load_dotenv

from django.urls import path
from xcel.order.views import OrderList, OrderDetail, UserProfile, UserCreate, UserLogout, UserLogin, local_orders, LocalOrdersList

load_dotenv()

XCEL_ORDERS_KEY = os.environ.get('XCEL_ORDERS_KEY')


urlpatterns = [
    path('api/orders/', OrderList.as_view()),
    path('api/l-orders/%s' %XCEL_ORDERS_KEY, LocalOrdersList.as_view()),
    path('api/orders/<int:pk>/', OrderDetail.as_view()),
    path('api/register/', UserCreate.as_view()),
    path('api/user/', UserProfile.as_view()),
    path('api/logout/', UserLogout.as_view()),
    path('api/login/', UserLogin.as_view()),
    path('local_orders/%s' %XCEL_ORDERS_KEY, local_orders),
]