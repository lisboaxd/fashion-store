from django.test import TestCase
from django.urls import reverse
from rest_framework import status


class StockTestCase(TestCase):
    def setUp(self):

        self.seller_post_data = {
            "user": {
                "username": "test_user3",
                "email": "test_user3@test.com",
                "password": "Test@user__dafiti",
                "first_name": "Test3",
                "last_name": "User3",
            }
        }
        self.seller_create_read_url = reverse("seller_list_create")
        self.seller = self.client.post(
            self.seller_create_read_url,
            data=self.seller_post_data,
            content_type="application/json",
        )
        self.category_post_data = {
            "category": "category test",
            "owner": self.seller.json()["id"],
            "seller": self.seller_post_data,
        }
        self.category_create_read_url = reverse("category_list_create")
        self.category = self.client.post(
            self.category_create_read_url, data=self.category_post_data
        )

        self.product_post_data = {
            "product": "product test",
            "category": self.category.json()["id"],
            "price": "999.00",
            "description": "descricao",
            "discount": 20,
        }
        self.product_create_read_url = reverse("product_list_create")
        self.product = self.client.post(
            self.product_create_read_url, data=self.product_post_data
        )
        self.post_data = {
            "product": self.product.json()["id"],
            "quantity": 50,
            "seller": self.seller.json()["id"],
        }
        self.create_read_url = "stock_list_create"
        self.retrieve_update_delete_url = "stock_retrieve_update_destroy"

    def test_create(self):
        response = self.client.post(
            reverse(self.create_read_url), data=self.post_data
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list(self):
        response = self.client.post(
            reverse(self.create_read_url), data=self.post_data
        )
        response = self.client.get(reverse(self.create_read_url))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(response.json(), [])

    def test_retrieve(self):
        response = self.client.post(
            reverse(self.create_read_url), data=self.post_data
        )
        response = self.client.get(
            reverse(
                self.retrieve_update_delete_url,
                kwargs={"pk": response.json().get("pk")},
            )
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        content = {"pk", "quantity", "product", "seller"}
        self.assertEquals(set(response.json().keys()), content)

    def test_delete(self):
        response = self.client.post(
            reverse(self.create_read_url), data=self.post_data
        )
        response = self.client.delete(
            reverse(
                self.retrieve_update_delete_url,
                kwargs={"pk": response.json().get("pk")},
            )
        )
        self.assertEquals(response.status_code, 204)
