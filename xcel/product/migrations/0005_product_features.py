# Generated by Django 3.1.4 on 2021-02-11 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_feature'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='features',
            field=models.ManyToManyField(to='product.Feature'),
        ),
    ]
