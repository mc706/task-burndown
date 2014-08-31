from rest_framework import serializers
from sprints.models import Sprint


class SprintSerializer(serializers.HyperlinkedModelSerializer):
    account = serializers.Field(source='account.username')
    sprint_total = serializers.Field(source='get_sprint_total')
    active_total = serializers.Field(source='get_active_total')
    burndown = serializers.Field(source='burndown')

    class Meta:
        model = Sprint
        fields = (
            'id',
            'account',
            'name',
            'sprint_total',
            'active_total',
            'burndown',
        )