from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from sellers.models import Category, Seller


class CategoryTestCase(TestCase):
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
        self.post_data = {"category": "Test Category", "owner": self.seller.pk}
        self.client.login(username="test_user", password="Test@user__dafiti")
        self.create_read_url = reverse("category_list_create")
        self.retrieve_update_delete_url = reverse(
            "category_retrieve_update_destroy", kwargs={"pk": "1"}
        )

    def test_create(self):
        response = self.client.post(self.create_read_url, self.post_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list(self):
        response = self.client.post(self.create_read_url, self.post_data)
        response = self.client.get(self.create_read_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(response.json(), [])

    def test_retrieve(self):
        response = self.client.post(self.create_read_url, self.post_data)
        response = self.client.get(self.retrieve_update_delete_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        content = {"pk": 1, "category": "Test Category", "owner": 1}
        self.assertEquals(response.json(), content)

    def teste_delete(self):
        response = self.client.post(self.create_read_url, self.post_data)
        response = self.client.delete(self.retrieve_update_delete_url)
        self.assertEquals(response.status_code, 204)
        self.assertEquals(self.model_class.objects.count(), 0)
