# Generated by Django 3.1.4 on 2021-05-22 19:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0010_auto_20210522_1908'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='localorder',
            name='xcelfooid',
        ),
    ]
