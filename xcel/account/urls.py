from django.urls import path
from xcel.account.views import AccountDetail


urlpatterns = [
    path('api/account/', AccountDetail.as_view()),
]
