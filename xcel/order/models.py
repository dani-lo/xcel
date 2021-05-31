from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from xcel.account.models import Account
from xcel.basket.models import Basket, LocalBasketPayment
from xcel.product.models import Product


class Order(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    deleted = models.DateTimeField(blank=True, null=True)
    unit_price = models.DecimalField(decimal_places=2,max_digits=10, default=0)
    quantity = models.PositiveSmallIntegerField(default=0)

    basket = models.ForeignKey(Basket, related_name="orders", on_delete=models.CASCADE, blank=False, null=False, default=None)
    product = models.ForeignKey(Product, related_name="+", on_delete=models.CASCADE, blank=False, null=False, default=None)

    class Meta:
        ordering = ['created']

class LocalOrder(models.Model):

    PAID = "PAID"
    DECLINED = "DECLINED"
    OPEN = "OPEN"
    STALE = "STALE"

    STATUS = [
        (PAID, 'PAID'),
        (OPEN, 'OPEN'),
        (STALE, 'STALE'),
        (DECLINED, "DECLINED")
    ]
    

    user_email = models.CharField(max_length=255, blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS, default=OPEN)
    created = models.DateTimeField(auto_now_add=True)
    deleted = models.DateTimeField(blank=True, null=True)
    unit_price = models.DecimalField(decimal_places=2,max_digits=10, default=0)
    quantity = models.PositiveSmallIntegerField(default=0)
    token = models.CharField(max_length=24, blank=True, default='')
    poid = models.CharField(max_length=24, blank=True, default='')
    xcelid = models.CharField(max_length=24, default=0)
    product = models.ForeignKey(Product, related_name="+", on_delete=models.CASCADE, blank=False, null=False, default=None)
    totalcheckout = models.CharField(max_length=24, default=0)
    class Meta:
        ordering = ['created']

class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):

        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(username=email, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)

    account = models.OneToOneField(
        Account,
        on_delete=models.CASCADE,
        null=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        ordering = ["email"]