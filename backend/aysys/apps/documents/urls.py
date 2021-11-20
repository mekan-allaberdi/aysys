from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from apps.documents import views

router = DefaultRouter()
router.register(r"folders", views.FolderViewSet)
router.register(r"documents", views.DocumentViewSet)
router.register(r"projects", views.ProjectViewSet)
router.register(r"collaborators", views.CollaboratorViewSet)

urlpatterns = [url(r"^", include(router.urls))]
