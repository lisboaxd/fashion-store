from django.contrib.auth.models import User
from rest_framework import serializers

from apps.sellers.utils import add_permissions_to_user

from .models import Category, Image, Product, Seller, Stock


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class RegisterSellerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Seller
        fields = ["pk", "user"]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data["user"])
        add_permissions_to_user(user, ["category", "image", "stock", "product"])
        user.is_staff = True
        user.save()
        seller = Seller.objects.create(user=user)
        return seller


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ["pk", "user"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["pk", "category", "owner"]
        read_only_fields = ["owner"]


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["image", "pk"]
        read_only_fields = ["pk"]


class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "pk",
            "product",
            "category",
            "price",
            "description",
            "images",
            "total_price",
        ]
        read_only_fields = ["total_price", "stock__quantity"]


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["pk", "product", "quantity"]
