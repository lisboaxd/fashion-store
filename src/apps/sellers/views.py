from rest_framework import decorators, permissions, response, status
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from .models import Category, Product, Seller, Stock
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    RegisterSellerSerializer,
    SellerSerializer,
    StockSerializer,
    UserSerializer,
)


class SellerRegisterAPIView(CreateAPIView):
    queryset = Seller.objects.all()
    serializer_class = RegisterSellerSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        user_data = request.data.copy()
        serializer = UserSerializer(data=user_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            username = user_data.pop("username")
            user_data.update({"username": "nada"})
            seller_serializer = self.get_serializer(data={"user": user_data})
            seller_serializer.is_valid()
            seller_serializer.save(user=user)
            user_data.update({"username": username})
            return response.Response(
                user_data,
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
            serializer.save(owner=request.user.seller)
            return response.Response(
                serializer.validated_data, status.HTTP_201_CREATED
            )
        # TODO log error on logservice


class CategoryRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListCreateAPIView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class StockListCreateAPIView(ListCreateAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class StockRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
