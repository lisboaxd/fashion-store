from django.contrib import admin
from django.urls import path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token
from sellers.views import (
    CategoryListCreateAPIView,
    CategoryRetrieveUpdateDestroy,
    ProductImage,
    ProductListCreateAPIView,
    ProductRetrieveUpdateDestroy,
    SellerListCreateAPIView,
    SellerRegisterAPIView,
    SellerRetrieveUpdateDestroy,
    StockListCreateAPIView,
    StockRetrieveUpdateDestroy,
)

schema_view = get_schema_view(
    openapi.Info(
        title="Fashion Store API",
        default_version="v1",
    ),
    public=True,
    permission_classes=[permissions.IsAuthenticated],
)


urlpatterns = [
    re_path(
        r"^docs(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^docs/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
    path("admin/", admin.site.urls),
    path("api/v1/auth/", obtain_auth_token, name="auth_token"),
    path(
        "api/v1/register/",
        SellerRegisterAPIView.as_view(),
        name="seller_register",
    ),
    path(
        "api/v1/seller/",
        SellerListCreateAPIView.as_view(),
        name="seller_list_create",
    ),
    path(
        "api/v1/seller/<int:pk>",
        SellerRetrieveUpdateDestroy.as_view(),
        name="seller_retrieve_update_destroy",
    ),
    path(
        "api/v1/category/",
        CategoryListCreateAPIView.as_view(),
        name="category_list_create",
    ),
    path(
        "api/v1/category/<int:pk>",
        CategoryRetrieveUpdateDestroy.as_view(),
        name="category_retrieve_update_destroy",
    ),
    path(
        "api/v1/product/",
        ProductListCreateAPIView.as_view(),
        name="product_list_create",
    ),
    path(
        "api/v1/product/<int:pk>",
        ProductRetrieveUpdateDestroy.as_view(),
        name="product_retrieve_update_destroy",
    ),
    path(
        "api/v1/product/<int:pk>/image",
        ProductImage.as_view(),
        name="product_image",
    ),
    path(
        "api/v1/stock/",
        StockListCreateAPIView.as_view(),
        name="stock_list_create",
    ),
    path(
        "api/v1/stock/<int:pk>",
        StockRetrieveUpdateDestroy.as_view(),
        name="stock_retrieve_update_destroy",
    ),
]
