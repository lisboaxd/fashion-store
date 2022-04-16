from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from sellers.views import SellerListCreateAPIView, SellerRetrieveUpdateDestroy

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", obtain_auth_token, name="auth_token"),
    path("api/seller/", SellerListCreateAPIView.as_view(), name="seller"),
    path(
        "api/seller/<int:pk>",
        SellerRetrieveUpdateDestroy.as_view(),
        name="seller",
    ),
]
