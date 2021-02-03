from django.db import models


class Account(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    firstname = models.CharField(max_length=200, blank=False, default='')
    lastname = models.CharField(max_length=200, blank=False, default='')
    address_line_1 = models.CharField(max_length=200, blank=False, default='')
    address_line_2 = models.CharField(max_length=200, blank=True, default='')
    country = models.CharField(max_length=200, blank=False, default='')
    postcode = models.CharField(max_length=200, blank=False, default='')

    class Meta:
        ordering = ['created']
