from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('about', views.index),
    path('shop', views.index),
    path('account', views.index),
    path('basket', views.index),
    path('register', views.index),
]
