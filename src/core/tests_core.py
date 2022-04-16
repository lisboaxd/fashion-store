from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status


class SelfAPITests(TestCase):
    def setUp(self):
        self.test_user = User.objects.create_user(
            "test_user", "test_user@test.com", "Test@user__dafiti"
        )
        self.client.login(username="test_user", password="Test@user__dafiti")

    def test_obtain_token_auth(self):
        response = self.client.post(
            reverse("auth_token"),
            {"username": "test_user", "password": "Test@user__dafiti"},
        )
        self.assertIn("token", response.json().keys())
