# Generated by Django 3.1.4 on 2021-05-22 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0009_auto_20210522_1859'),
    ]

    operations = [
        migrations.AddField(
            model_name='localorder',
            name='xcelfooid',
            field=models.CharField(default=0, max_length=24),
        ),
        migrations.AlterField(
            model_name='localorder',
            name='xcelid',
            field=models.CharField(default=0, max_length=24),
        ),
    ]
