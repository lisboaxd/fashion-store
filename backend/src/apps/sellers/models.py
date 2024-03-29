from decimal import Decimal

from core.models import TimeStampedModel
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from .utils import upload_gallery_image


class Seller(TimeStampedModel):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "sellers"

    def __str__(self) -> str:
        return f"Seller: {self.user.first_name}"


class Category(TimeStampedModel):
    name = models.CharField(
        "Category", "category", max_length=255, blank=False, null=False
    )
    owner = models.ForeignKey(
        Seller, on_delete=models.CASCADE, related_name="categories"
    )

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return f"{self.category}"


0


class Product(TimeStampedModel):
    name = models.CharField(
        "Product", "product", max_length=255, blank=False, null=False
    )
    price = models.DecimalField(
        "Price", max_digits=10, decimal_places=2, blank=False, null=False
    )
    description = models.TextField("Description", blank=True, null=True)

    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )
    discount = models.PositiveIntegerField(
        "Discount",
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name_plural = "products"

    def __str__(self) -> str:
        return f"{self.product}"

    @property
    def total_price(self):
        return self.price * self.stock.quantity

    @property
    def price_with_discount(self):
        return self.price - (self.price * Decimal(self.discount / 100))


class Image(models.Model):
    image = models.ImageField(upload_to=upload_gallery_image)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )


class Stock(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, related_name="stock"
    )
    seller = models.ForeignKey(
        Seller, on_delete=models.CASCADE, related_name="stock"
    )
    quantity = models.PositiveIntegerField(
        "Quantity", default=0, blank=False, null=False
    )

    class Meta:
        verbose_name_plural = "Stocks"

    def __str__(self) -> str:
        return f"{self.product} | {self.quantity}"
