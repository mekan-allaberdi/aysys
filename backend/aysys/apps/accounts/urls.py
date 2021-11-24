from django.conf.urls import include, url
from django.urls import path
from rest_framework.routers import DefaultRouter
from apps.accounts import views

from rest_framework_simplejwt.views import TokenRefreshView

from apps.accounts.views import LogoutView

router = DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)


urlpatterns = [
    url(r"^", include(router.urls)),
    path(
        "token/",
        views.CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
