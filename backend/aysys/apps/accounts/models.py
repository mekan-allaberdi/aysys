from django.db import models
from django.contrib.auth.models import User, Group

User._meta.get_field("email")._unique = True
User._meta.get_field("email").blank = False
User._meta.get_field("email").null = False

User.add_to_class("phone", models.CharField(max_length=20, null=True, blank=True))
User.add_to_class("name", models.CharField(max_length=40, null=True, blank=True))


Group.add_to_class(
    "description", models.CharField(max_length=180, null=True, blank=True)
)
