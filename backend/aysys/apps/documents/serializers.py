from rest_framework import serializers
from apps.documents.models import Collaborator, Project, Document


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Document
        fields = ['url', 'name', 'directory', 'description', 'type',
                  'owner', 'project',  'allowed_users', 'allowed_groups']


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    # documents = serializers.HyperlinkedIdentityField(
    #     many=True, view_name='document-detail', read_only=True)

    class Meta:
        model = Project
        fields = ['name', 'type', 'collaborators']


class CollaboratorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Collaborator
        fields = ['name', 'description', 'type', 'phone',
                  'email', 'address']
