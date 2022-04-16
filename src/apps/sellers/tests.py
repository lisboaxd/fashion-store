from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from .models import Seller


class SelfAPITests(TestCase):
    def setUp(self):
        self.test_user = User.objects.create_user(
            "test_user",
            "test_user@test.com",
            "Test@user__dafiti",
            first_name="Test",
            last_name="User",
        )
        self.client.login(username="test_user", password="Test@user__dafiti")

    def testCreateSeller(self):
        seller = Seller(user=self.test_user)
        print(seller)
        self.assertEqual(type(seller), Seller)
