from datetime import datetime
from rest_framework import viewsets, permissions
from tasks.models import Task, Category
from tasks.serializers import TaskSerializer, CategorySerializer
from task_burndown.permissions import IsOwner, IsOwnerFilterBackend


class TaskViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    serializer_class = TaskSerializer
    permission_classes = (IsOwner,)
    filter_backends = (IsOwnerFilterBackend,)

    def pre_save(self, obj):
        if obj.completed and not obj.date_closed:
            obj.date_closed = datetime.now()
        if not obj.completed and obj.date_closed:
            obj.date_closed = None
        obj.account = self.request.user


    def get_queryset(self):
        return Task.objects.filter(account=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    serializer_class = CategorySerializer
    permission_classes = (IsOwner,)
    filter_backends = (IsOwnerFilterBackend,)

    def pre_save(self, obj):
        obj.account = self.request.user

    def get_queryset(self):
        return Category.objects.filter(account=self.request.user)
