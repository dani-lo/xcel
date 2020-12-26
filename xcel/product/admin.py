from django.contrib import admin
from xcel.product import models


admin.site.register(models.Product)
admin.site.register(models.Ingredient)
