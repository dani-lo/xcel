# Generated by Django 3.1.4 on 2021-01-13 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='img_a',
            field=models.ImageField(default='placeholder.png', upload_to='product_images'),
        ),
        migrations.AddField(
            model_name='product',
            name='img_b',
            field=models.ImageField(default='placeholder.png', upload_to='product_images'),
        ),
    ]