# Generated by Django 3.1.4 on 2021-01-09 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0011_auto_20210104_1827'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('paid', 'PAID'), ('open', 'OPEN'), ('deleted', 'DELETED'), ('processed', 'DELETED')], default='open', max_length=20),
        ),
    ]
