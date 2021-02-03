from django.urls import path
from xcel.basket.views import BasketDetail, PrepareBasket


urlpatterns = [
    path('api/basket/', BasketDetail.as_view()),
    path('api/checkout/<int:pk>', PrepareBasket.as_view()),
]