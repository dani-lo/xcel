from django.urls import path
from xcel.order.views import OrderList, OrderDetail, UserProfile, UserCreate, UserLogout, UserLogin


urlpatterns = [
    path('api/orders/', OrderList.as_view()),
    path('api/orders/<int:pk>/', OrderDetail.as_view()),
    path('api/register', UserCreate.as_view()),
    path('api/user', UserProfile.as_view()),
    path('api/logout/', UserLogout.as_view()),
    path('api/login', UserLogin.as_view()),
]