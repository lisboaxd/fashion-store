from django.contrib import admin
from .models import Category, Product, Seller, Stock

admin.site.register(Seller)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Stock)
