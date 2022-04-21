from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from sellers.models import Seller


class SellerTestCase(TestCase):
    def setUp(self):
        self.user_values = {
            "username": "test_user",
            "email": "test_user@test.com",
            "password": "Test@user__dafiti",
            "first_name": "Test",
            "last_name": "User",
        }
        self.test_user = User.objects.create_user(
            username="test_user",
            email="test_user@test.com",
            password="Test@user__dafiti",
            first_name="Test",
            last_name="User",
        )
        self.seller_user = Seller.objects.create(user=self.test_user)
        self.client.login(username="test_user", password="Test@user__dafiti")
        self.create_read_url = reverse("seller_list_create")
        self.retrieve_update_delete_url = reverse(
            "seller_retrieve_update_destroy", kwargs={"pk": self.test_user.pk}
        )

    def test_should_register_new_seller(self):
        self.client.logout()
        post = {
            "user": {
                "username": "test_user3",
                "email": "test_user3@test.com",
                "password": "Test@user__dafiti",
                "first_name": "Test3",
                "last_name": "User3",
            }
        }
        url = reverse("seller_register")
        response = self.client.post(
            url, data=post, content_type="application/json"
        )
        self.user_pk = response.json().get("pk")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.login(username="test_user", password="Test@user__dafiti")

    def test_should_deny_create_seller_with_same_credentials(self):
        self.client.logout()
        post = self.user_values
        url = reverse("seller_register")
        response = self.client.post(url, {"user": post})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.client.login(username="test_user", password="Test@user__dafiti")

    def test_create(self):

        response = self.client.post(
            self.create_read_url,
            data={
                "user": {
                    "username": "test_user2",
                    "email": "test_user2@test.com",
                    "password": "Test@user__dafiti",
                    "first_name": "Tes2t",
                    "last_name": "User2",
                }
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):
        url = reverse(
            "seller_retrieve_update_destroy", kwargs={"pk": self.seller_user.pk}
        )
        response = self.client.delete(url)
        self.assertEquals(response.status_code, 204)
        self.assertEquals(Seller.objects.count(), 0)

    def test_list(self):
        response = self.client.get(
            self.create_read_url, content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(response.json(), [])

    def test_retrieve(self):
        post = {
            "user": {
                "username": "test_user3",
                "email": "test_user3@test.com",
                "password": "Test@user__dafiti",
                "first_name": "Test3",
                "last_name": "User3",
            }
        }
        url = reverse("seller_register")
        seller_created = self.client.post(
            url, data=post, content_type="application/json"
        ).json()
        response = self.client.get(
            reverse(
                "seller_retrieve_update_destroy",
                kwargs={"pk": seller_created["pk"]},
            )
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
