from rest_framework import serializers
from .models import Product, Ingredient


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ['name', 'description']


class ProductSerializer(serializers.ModelSerializer):

    depth = 2
    ingredients = IngredientSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'logo', 'img_a', 'img_b', 'about', 'price', 'ingredients']
