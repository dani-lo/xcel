from django.db import models
from django.conf import settings

class Basket(models.Model):
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

    created = models.DateTimeField(auto_now_add=True)
    instructions = models.CharField(max_length=200, blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS, default=OPEN)
    token = models.CharField(max_length=24, blank=True, default='')
    poid = models.CharField(max_length=24, blank=True, default='')

    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='baskets', on_delete=models.CASCADE, blank=False,
                              null=False, default=None)


    # def save(self, *args, **kwargs):
    #     if not self.pk:
    #
    #     super(MyModel, self).save(*args, **kwargs)


class LocalBasketPayment(models.Model):
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

  created = models.DateTimeField(auto_now_add=True)
  status = models.CharField(max_length=20, choices=STATUS, default=OPEN)
  token = models.CharField(max_length=24, blank=True, default='')
  poid = models.CharField(max_length=24, blank=True, default='')
  user_email = models.CharField(max_length=255, blank=True, default='')
  


  # def save(self, *args, **kwargs):
  #     if not self.pk:
  #
  #     super(MyModel, self).save(*args, **kwargs)