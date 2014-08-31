from rest_framework import viewsets, permissions
from sprints.models import Sprint
from sprints.serializers import SprintSerializer
from task_burndown.permissions import IsOwnerOrReadOnly


class SprintViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Sprint.objects.all()
    serializer_class = SprintSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly,)

    def pre_save(self, obj):
        obj.account = self.request.user
