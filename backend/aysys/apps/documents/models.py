from django.db import models
from django.contrib.auth.models import User, Group


class Collaborator(models.Model):
    TYPES = (("Client", "Client"), ("Partner", "Partner"))

    name = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True)
    type = models.CharField(max_length=100, null=True, choices=TYPES)
    phone = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=200, null=True)
    added_by = models.ForeignKey(
        "auth.User", related_name="collaborators", on_delete=models.CASCADE, null=True
    )
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    STATUS = (
        ("Announced", "Announced"),
        ("Won", "Won"),
        ("In Progress", "In Progress"),
        ("On Hold", "On Hold"),
        ("Done", "Done"),
    )

    name = models.CharField(max_length=200, blank=True, default="")
    supervisor = models.ForeignKey(
        "auth.User", related_name="projects", on_delete=models.CASCADE, null=True
    )
    collaborators = models.ManyToManyField(Collaborator)
    type = models.CharField(max_length=100, null=True, choices=STATUS)
    date_announced = models.DateTimeField(null=True)
    date_started = models.DateTimeField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)


class Document(models.Model):
    name = models.CharField(max_length=50, blank=True, default="")
    type = models.CharField(max_length=20, blank=True, default="")
    directory = models.CharField(max_length=200, blank=True, default="")
    description = models.CharField(max_length=200, blank=True, default="")
    owner = models.ForeignKey(
        "auth.User", related_name="documents", on_delete=models.CASCADE, null=True
    )
    project = models.ForeignKey(
        "Project", related_name="documents", on_delete=models.CASCADE, null=True
    )

    created = models.DateTimeField(auto_now_add=True)
    allowed_groups = models.ManyToManyField(Group)
    allowed_users = models.ManyToManyField(User)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["created"]