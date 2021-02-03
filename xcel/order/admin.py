from django.contrib import admin
from xcel.order.models import Order, CustomUser

admin.site.register(Order)


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'account_detail')
    fields = ('email',)
    ordering = ['id']
    exclude = ('username', 'first_name', 'last_name', 'password')
    change_form_template = 'admin/order_user_change_form.html'

    def account_detail (self, u):
        return '%s %s (%s)' % (u.account.firstname, u.account.lastname, u.account.postcode)

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['lame_static'] = 'some lame text'

        return super(CustomUserAdmin, self).change_view(request, object_id, form_url, extra_context=extra_context)
