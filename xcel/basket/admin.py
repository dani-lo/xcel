from django.contrib import admin
from xcel.basket.models import Basket
from xcel.basket.paypal.util import basket_total, basket_orders

# admin.site.register(Basket)

# @admin.register(Basket)
# class AdminBasket(admin.ModelAdmin):
#     list_display = ('status', 'user_detail', 'amount_total',)
#     change_form_template = 'admin/basket_change_form.html'
#     readonly_fields = ['instructions', 'token', 'poid', 'user']

#     def user_detail (self, b):
#         return b.user.email

#     def amount_total (self, b):
#         return basket_total(b.id)

#     def change_view(self, request, object_id, form_url='', extra_context=None):
#         extra_context = extra_context or {}
#         extra_context['orders'] = basket_orders(object_id)
#         extra_context['total'] = basket_total(object_id)

#         return super().change_view(request, object_id, form_url, extra_context=extra_context)
