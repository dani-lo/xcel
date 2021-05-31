from django.urls import path
from xcel.product.views import ProductList, ProductDetail


urlpatterns = [
    path('api/products/', ProductList.as_view()),
    path('api/products/<int:pk>/', ProductDetail.as_view()),
]