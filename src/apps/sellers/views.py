import logging

from django.contrib.contenttypes.models import ContentType
from django.core.cache import cache
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework import permissions, response, status
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from .models import Category, Product, Seller, Stock
from .serializers import (
    CategorySerializer,
    CSVUploadSerializer,
    ImageSerializer,
    ProductSerializer,
    RegisterSellerSerializer,
    SellerSerializer,
    StockSerializer,
    UserSerializer,
)
from .tasks import save_on_database_from_csv_file

logger = logging.getLogger("seller.logging")


class SellerRegisterAPIView(CreateAPIView):
    queryset = Seller.objects.all()
    serializer_class = RegisterSellerSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        user_data = request.data.copy()
        serializer = UserSerializer(data=user_data["user"])
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data.copy()
            seller_serializer = self.get_serializer(data={"user": data})
            if seller_serializer.is_valid(raise_exception=True):
                seller_serializer.save()
                # TODO add exception handling and logs
                return response.Response(
                    seller_serializer.data,
                    status=status.HTTP_201_CREATED,
                )


class SellerListCreateAPIView(ListCreateAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


class SellerRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


class CategoryListCreateAPIView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()
        serializer = serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save()
                return response.Response(
                    serializer.data, status.HTTP_201_CREATED
                )
            except Exception as e:
                logger.warning({"exception": e})
                return response.Response(
                    {"message": "You should be a Seller"},
                    status.HTTP_400_BAD_REQUEST,
                )


class CategoryRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListCreateAPIView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @method_decorator(cache_page(60))
    @method_decorator(
        vary_on_headers(
            "Authorization",
        )
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ProductRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductImage(CreateAPIView):
    serializer_class = ImageSerializer

    def create(self, request, *args, **kwargs):
        product = get_object_or_404(Product, pk=kwargs.get("pk"))
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(product=product)
        headers = self.get_success_headers(serializer.data)
        return response.Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class StockListCreateAPIView(ListCreateAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class StockRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class CsvFile(CreateAPIView):
    serializer_class = CSVUploadSerializer

    def create(self, request, *args, **kwargs):
        """
        #TODO One of the fields of the model/table must have its’ value
        #TODO calculated based on 1 or more of the other ones.
        """

        try:
            model = ContentType.objects.get(model=kwargs.get("model_name"))
        except ContentType.DoesNotExist:
            return response.Response(
                {"Error": "This model doesnt exists"},
                status.HTTP_400_BAD_REQUEST,
            )
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data["file"]
        file_name = default_storage.save(file.name, file)

        save_on_database_from_csv_file.delay(
            file_name, kwargs.get("model_name")
        )
        return response.Response(status=status.HTTP_204_NO_CONTENT)
