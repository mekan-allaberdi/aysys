from rest_framework import request, viewsets
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.parsers import FileUploadParser


from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework.filters import SearchFilter

from django.db.models import Q

from apps.documents.permissions import IsCurrentOrSuperUser
from apps.documents.models import Folder, Document, Project, Collaborator
from apps.documents.serializers import (
    DocumentSerializer,
    ProjectSerializer,
    CollaboratorSerializer,
    FolderSerializer,
)


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "projects": reverse("project-list", request=request, format=format),
            "collaborators": reverse(
                "collaborator-list", request=request, format=format
            ),
            "documents": reverse("document-list", request=request, format=format),
            "folders": reverse("folder-list", request=request, format=format),
        }
    )


class FolderViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    serializer_class = FolderSerializer
    queryset = Folder.objects.all()


class DocumentViewSet(viewsets.ModelViewSet):
    class DocumentFilter(FilterSet):
        class Meta:
            model = Document
            fields = [
                "owner_id",
                "allowed_users",
                "allowed_groups",
                "type",
                "project",
                "folder",
            ]

    filter_class = DocumentFilter
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ["project__name", "name", "type"]

    serializer_class = DocumentSerializer

    http_method_names = ["get", "post", "put"]
    permission_classes = [IsAuthenticated, IsCurrentOrSuperUser]

    queryset = Document.objects.all()

    def get_queryset(self):
        if not self.request.user.is_superuser:
            return Document.objects.filter(
                Q(allowed_users__in=[self.request.user])
                | Q(
                    allowed_groups__in=self.request.user.groups.values_list(
                        "id", flat=True
                    )
                )
            ).distinct()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsCurrentOrSuperUser]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class CollaboratorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsCurrentOrSuperUser]
    queryset = Collaborator.objects.all()
    serializer_class = CollaboratorSerializer
