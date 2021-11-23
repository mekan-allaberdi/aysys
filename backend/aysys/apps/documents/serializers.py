from rest_framework import serializers
from apps.documents.models import Collaborator, Project, Document, Folder
from apps.documents.utils import readable_size


class FolderSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    child_folders = serializers.HyperlinkedIdentityField(
        many=True, view_name="folder-detail", read_only=True
    )

    child_documents = serializers.HyperlinkedIdentityField(
        many=True, view_name="document-detail", read_only=True
    )

    class Meta:
        model = Folder
        fields = [
            "id",
            "name",
            "path",
            "parent_folder",
            "child_folders",
            "child_documents",
        ]


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    file = serializers.FileField(read_only=True)

    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Document
        fields = [
            "url",
            "name",
            "folder",
            "description",
            "type",
            "owner",
            "project",
            "allowed_users",
            "allowed_groups",
            "file",
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        file = {
            "url": representation.pop("file"),
            "size": instance.file.size,
            "readable_size": readable_size(instance.file.size),
            "name": instance.file.name.split("/")[-1],
        }
        representation["file"] = file
        return representation


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
