from django.urls import path
from xcel.basket.views import BasketDetail, PrepareBasket, payment_return, payment_confirm, LocalCheckout, LocalBasketDetail


urlpatterns = [
    path('api/basket/', BasketDetail.as_view()),
    path('api/checkout/<int:pk>', PrepareBasket.as_view()),
    path('api/l-checkout', LocalCheckout.as_view()),
    path('payment_return', payment_return),
    path('payment_confirm/<slug:pid>', payment_confirm),
    path('api/l-basket/', LocalBasketDetail.as_view())
]