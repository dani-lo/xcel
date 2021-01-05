from django.urls import path
from xcel.order.views import OrderList, OrderDetail, UserList, UserDetail


urlpatterns = [
    path('api/orders/', OrderList.as_view()),
    path('api/orders/<int:pk>/', OrderDetail.as_view()),
]

path('api/users/', UserList.as_view()),
path('api/users/<int:pk>/', UserDetail.as_view()),

