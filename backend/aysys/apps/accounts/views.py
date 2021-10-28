from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from rest_framework.permissions import IsAdminUser

from apps.accounts.permissions import UserPermission
from apps.accounts.serializers import (
    UserSerializer,
    GroupSerializer,
    CustomTokenObtainPairSerializer,
)

from rest_framework_simplejwt.views import TokenObtainPairView


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [UserPermission]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
