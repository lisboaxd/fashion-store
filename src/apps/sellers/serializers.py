from rest_framework import serializers

from .models import Category, Product, Seller, Stock


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ["pk", "user"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["pk", "category", "owner"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["pk", "product", "category"]


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["pk", "product", "quantity"]
