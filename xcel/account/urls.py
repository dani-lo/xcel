from django.urls import path
from xcel.account.views import AccountDetail, AccountUpdate


urlpatterns = [
    path('api/account/', AccountDetail.as_view()),
    path('api/account/update/<int:pk>/', AccountUpdate.as_view()),
]
