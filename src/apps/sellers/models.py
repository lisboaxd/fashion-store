from django.db import models
from django.contrib.auth import get_user_model

from core.models import TimeStampedModel


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
    owner = models.ForeignKey(Seller, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return f"{self.category}"


class Product(TimeStampedModel):
    name = models.CharField(
        "Product", "product", max_length=255, blank=False, null=False
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "products"

    def __str__(self) -> str:
        return f"{self.product}"


class Stock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(
        "Quantity", default=0, blank=False, null=False
    )

    class Meta:
        verbose_name_plural = "Stocks"

    def __str__(self) -> str:
        return f"{self.product} | {self.quantity}"
