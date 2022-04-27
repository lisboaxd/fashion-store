import random

import factory
from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory

import sellers.models as m

Seller
Category
Product
Image
Stock


class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = factory.Faker("username")


class SellerFactory(DjangoModelFactory):
    class Meta:
        model = m.Seller

    zipcode = factory.Faker("postcode")
    public_place = factory.Faker("street_suffix")
    number = factory.Faker("building_number")
    neighborhood = factory.Faker("street_suffix")
    city = factory.Faker("city")
    state = random.choices(m.Address.STATE_CHOICES, k=1)[0][0]
    street = factory.Faker("street_name")


class PersonFactory(DjangoModelFactory):
    class Meta:
        model = m.Person

    type = random.choices(m.Person.PERSON_TYPE_CHOICES, k=1)[0][0]
    gender = random.choices(m.Person.GENDER_CHOICES, k=1)[0][0]
    name = factory.Faker("first_name")
    rg = factory.Faker("msisdn")
    cpf_cnpj = factory.Faker("msisdn")
    birth_date = factory.Faker("date")
    email = factory.Faker("free_email")
    cellphone = factory.Faker("msisdn")
    telephone = factory.Faker("msisdn")
    address = factory.SubFactory(AddressFactory)
