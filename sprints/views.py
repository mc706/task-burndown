from rest_framework import viewsets, permissions
from sprints.models import Sprint
from sprints.serializers import SprintSerializer
from task_burndown.permissions import IsOwner


class SprintViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    serializer_class = SprintSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner,)

    def pre_save(self, obj):
        obj.account = self.request.user

    def get_queryset(self):
        return Sprint.objects.filter(account=self.request.user)
