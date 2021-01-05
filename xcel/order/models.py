from django.db import models
from enum import Enum

from xcel.product.models import Product

class OrderStatuses(Enum):
    PAID = "paid"
    OPEN = "open"
    PROCESSED = "processed"
    DELETED = "deleted"


status_choices = ((order_status.name, order_status.value) for order_status in OrderStatuses)


class Order(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    instructions = models.CharField(max_length=200, blank=True, default='')
    status = models.CharField(max_length=20, choices=status_choices, default=OrderStatuses.OPEN.value)
    unit_price = models.DecimalField(decimal_places=2,max_digits=10, default=0)
    quantity = models.PositiveSmallIntegerField(default=0)

    owner = models.ForeignKey('auth.User', related_name='orders', on_delete=models.CASCADE, blank=False, null=False, default=None)
    product = models.ForeignKey(Product, related_name="+", on_delete=models.CASCADE, blank=False, null=False, default=None)

    class Meta:
        ordering = ['created']
