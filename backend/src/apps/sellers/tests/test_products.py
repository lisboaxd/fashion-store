from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from sellers.models import Category, Product, Seller


class ProductTestCase(TestCase):
    def setUp(self):
        self.model_class = Category
        self.test_user = User.objects.create_user(
            username="test_user",
            email="test_user@test.com",
            password="Test@user__dafiti",
            first_name="Test",
            last_name="User",
        )
        self.seller = Seller.objects.create(user=self.test_user)
        self.client.login(username="test_user", password="Test@user__dafiti")

        category_payload = {
            "category": "Categoria teste",
            "seller": self.seller.pk,
            "owner": self.seller.pk,
        }
        self.category_create_response = self.client.post(
            reverse("category_list_create"),
            category_payload,
            content_type="application/json",
        )

        self.create_read_url = reverse("product_list_create")
        self.retrieve_update_delete_url = "product_retrieve_update_destroy"

    def Testcreate(self):

        product_payload = {
            "product": "Nome produto",
            "category": self.category_create_response.json().get("id"),
            "price": "90.00",
            "description": "Descricao",
        }
        response = self.client.post(self.create_read_url, product_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def Testlist(self):
        response = self.client.get(self.create_read_url)
        self.list_response = response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(response.json(), [])

    def Testretrieve(self):
        response = self.client.get(
            reverse(
                self.retrieve_update_delete_url,
                kwargs={"pk": self.list_response.json()[0].get("id")},
            )
        )
        self.retrieve_response = response

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        content = {
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
        }
        self.assertEquals(set(response.json().keys()), content)

    def Testdelete(self):
        response = self.client.delete(
            reverse(
                self.retrieve_update_delete_url,
                kwargs={"pk": self.retrieve_response.json().get("id")},
            )
        )
        self.assertEquals(response.status_code, 204)

    def test_api_products(self):
        self.Testcreate()
        self.Testlist()
        self.Testretrieve()
        self.Testdelete()
