from xcel.account.models import Account
from xcel.account.serializers import AccountSerializer

from rest_framework import generics, permissions, status
from rest_framework.response import Response

class AccountDetail(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            user = self.request.user
            user.account = Account(**serializer.validated_data)
            user.account.save()
            user.save()

            return Response({'id': user.account.id}, status=status.HTTP_200_OK)


class AccountUpdate(generics.UpdateAPIView) :

    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
