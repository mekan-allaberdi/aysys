from rest_framework import permissions


class UserPermission(permissions.BasePermission):
    """
    Custom User permission.
        LIST: Admin
        DETAIL: Admin or Current User
        CREATE: Admin
        EDIT: Admin or Current User
    """

    def has_permission(self, request, view):
        if view.action == 'list':
            return request.user.is_superuser
        else:
            return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.id == request.user.id or request.user.is_superuser

