from rest_framework import serializers
from .models import Product, Ingredient, Feature


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ['name', 'description']

class FeaturesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feature
        fields = ['name', 'description']


class ProductSerializer(serializers.ModelSerializer):

    depth = 2
    ingredients = IngredientSerializer(read_only=True, many=True)
    features = FeaturesSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'logo', 'img_a', 'img_b', 'about', 'price', 'ingredients', 'features']
