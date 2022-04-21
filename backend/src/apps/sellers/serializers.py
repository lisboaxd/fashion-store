from imp import source_from_cache

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
    user = UserSerializer()

    class Meta:
        model = Seller
        fields = ["id", "user", "created"]
        read_only_fields = ["created"]
        write_only_fields = ["user"]

    def create(self, validated_data):
        user = validated_data.pop("user")
        user = UserSerializer.create(UserSerializer(), validated_data=user)
        user.is_staff = True
        add_permissions_to_user(user, ["category", "image", "stock", "product"])
        user.save()
        seller, created = Seller.objects.update_or_create(
            user=user, **validated_data
        )
        return seller


class CategorySerializer(serializers.ModelSerializer):
    seller = SellerSerializer(source="owner", read_only=True)

    class Meta:
        model = Category
        fields = ["id", "category", "owner", "seller", "created"]


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["image", "pk"]
        read_only_fields = ["pk"]


class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    price_with_discount = serializers.DecimalField(
        decimal_places=2, max_digits=10, read_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "product",
            "category",
            "price",
            "description",
            "images",
            "total_price",
            "discount",
            "price_with_discount",
            "created",
        ]
        read_only_fields = [
            "total_price",
            "stock__quantity",
            "price_with_discount",
        ]


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["pk", "product", "quantity", "seller"]


class CSVUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

    class Meta:
        fields = ("file",)
