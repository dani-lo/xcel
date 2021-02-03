from xcel.account.models import Account
from xcel.account.serializers import AccountSerializer

from rest_framework import generics, permissions

class AccountDetail(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):

        if serializer.is_valid():

            user = self.request.user
            user.account = Account(**serializer.validated_data)
            user.account.save()
            user.save()


