# Generated by Django 3.1.4 on 2020-12-29 19:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_product_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='owner',
        ),
    ]
