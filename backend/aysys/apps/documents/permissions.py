from rest_framework import permissions

class IsCurrentOrSuperUser(permissions.BasePermission):
    """
    Checks if it is current or super user
    """

    def has_object_permission(self, request, view, obj):
        return (
            request.user in obj.allowed_users.all()
            or (request.user.groups.all() & obj.allowed_groups.all())
            or request.user.is_superuser
        )
