# Generated by Django 3.1.4 on 2021-05-22 13:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_product_features'),
        ('order', '0006_auto_20210120_1753'),
    ]

    operations = [
        migrations.CreateModel(
            name='LocalOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('deleted', models.DateTimeField(blank=True, null=True)),
                ('unit_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('quantity', models.PositiveSmallIntegerField(default=0)),
                ('product', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='product.product')),
            ],
            options={
                'ordering': ['created'],
            },
        ),
    ]