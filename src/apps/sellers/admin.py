from django.contrib import admin

from .models import Category, Image, Product, Seller, Stock


class ImageInline(admin.TabularInline):
    model = Image


class ProductAdmin(admin.ModelAdmin):
    inlines = [ImageInline]


admin.site.register(Seller)
admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(Stock)
