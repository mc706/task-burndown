from rest_framework import permissions
from rest_framework import filters

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view or edit it.
    Model instances are expected to include an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        return obj.account == request.user


class IsOwnerFilterBackend(filters.BaseFilterBackend):
    """
    Filter that only allows users to see their own objects.
    """
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(account=request.user)