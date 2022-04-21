from django.contrib import admin

from .models import Category, Image, Product, Seller, Stock


class ImageInline(admin.TabularInline):
    model = Image


class ProductAdmin(admin.ModelAdmin):

    inlines = [ImageInline]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if hasattr(request.user, "seller"):
            return qs.filter(category__in=request.user.seller.categories.all())
        return qs

    def formfield_for_foreignkey(self, db_field, request=None, **kwargs):
        if db_field.name == "category" and hasattr(request.user, "seller"):
            kwargs["queryset"] = Category.objects.filter(
                pk__in=request.user.seller.categories.all().values_list("pk")
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class CategoryAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if hasattr(request.user, "seller"):
            return qs.filter(owner=request.user.seller)
        return qs

    def formfield_for_foreignkey(self, db_field, request=None, **kwargs):
        if db_field.name == "owner" and hasattr(request.user, "seller"):
            kwargs["queryset"] = Seller.objects.filter(
                pk=request.user.seller.pk
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class StockAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if hasattr(request.user, "seller"):
            return request.user.seller.stock.all()
        return qs

    def formfield_for_foreignkey(self, db_field, request=None, **kwargs):
        if db_field.name == "product" and hasattr(request.user, "seller"):
            categories = request.user.seller.categories.all()
            kwargs["queryset"] = Product.objects.filter(
                category__in=categories.values_list("pk", flat=True)
            )
        if db_field.name == "seller" and hasattr(request.user, "seller"):
            kwargs["queryset"] = Seller.objects.filter(
                pk=request.user.seller.pk
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Seller)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Stock, StockAdmin)
