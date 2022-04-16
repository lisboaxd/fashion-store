from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from sellers.models import Seller


class SellerTestCase(TestCase):
    def setUp(self):
        self.test_user = User.objects.create_user(
            username="test_user",
            email="test_user@test.com",
            password="Test@user__dafiti",
            first_name="Test",
            last_name="User",
        )

        self.client.login(username="test_user", password="Test@user__dafiti")
        self.create_read_url = reverse("seller_list_create")
        self.retrieve_update_delete_url = reverse(
            "seller_retrieve_update_destroy", kwargs={"pk": "1"}
        )

    def test_create(self):
        response = self.client.post(
            self.create_read_url, {"user": self.test_user.pk}
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list(self):
        response = self.client.post(
            self.create_read_url, {"user": self.test_user.pk}
        )
        response = self.client.get(self.create_read_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(response.json(), [])

    def test_retrieve(self):
        response = self.client.post(
            self.create_read_url, {"user": self.test_user.pk}
        )
        response = self.client.get(self.retrieve_update_delete_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        content = {"pk": 1, "user": self.test_user.pk}
        self.assertEquals(response.json(), content)

    def teste_delete(self):
        response = self.client.post(
            self.create_read_url, {"user": self.test_user.pk}
        )
        response = self.client.delete(self.retrieve_update_delete_url)
        self.assertEquals(response.status_code, 204)
        self.assertEquals(Seller.objects.count(), 0)
