from rest_framework import serializers
from apps.documents.models import Collaborator, Project, Document, Folder


class FolderSerializer(serializers.HyperlinkedModelSerializer):
    child_folders = serializers.HyperlinkedIdentityField(
        many=True, view_name="folder-detail", read_only=True
    )

    child_documents = serializers.HyperlinkedIdentityField(
        many=True, view_name="document-detail", read_only=True
    )

    class Meta:
        model = Folder
        fields = ["name", "path", "parent_folder", "child_folders", "child_documents"]


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Document
        fields = [
            "url",
            "name",
            "folder",
            "description",
            "type",
            "file",
            "owner",
            "project",
            "allowed_users",
            "allowed_groups",
        ]


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    # documents = serializers.HyperlinkedIdentityField(
    #     many=True, view_name='document-detail', read_only=True)

    class Meta:
        model = Project
        fields = ["name", "type", "collaborators"]


class CollaboratorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Collaborator
        fields = ["name", "description", "type", "phone", "email", "address"]
