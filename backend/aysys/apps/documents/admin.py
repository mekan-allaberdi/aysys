from django.contrib import admin
from apps.documents.models import Document, Project, Collaborator
# Register your models here.

admin.site.register(Project)
admin.site.register(Document)
admin.site.register(Collaborator)
