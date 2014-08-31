from rest_framework import viewsets, permissions
from tasks.models import Task, Category
from tasks.serializers import TaskSerializer, CategorySerializer
from task_burndown.permissions import IsOwnerOrReadOnly


class TaskViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly,)

    def pre_save(self, obj):
        obj.account = self.request.user


class CategoryViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)


    def pre_save(self, obj):
        obj.account = self.request.user