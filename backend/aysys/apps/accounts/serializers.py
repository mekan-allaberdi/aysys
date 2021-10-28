from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    documents = serializers.HyperlinkedIdentityField(
        many=True, view_name="document-detail", read_only=True
    )

    class Meta:
        model = User
        fields = [
            "url",
            "id",
            "username",
            "name",
            "phone",
            "email",
            "documents",
            "groups",
        ]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "id", "name", "description"]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["name"] = user.name
        token["username"] = user.username

        return token
