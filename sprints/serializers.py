from rest_framework import serializers
from sprints.models import Sprint


class SprintSerializer(serializers.HyperlinkedModelSerializer):
    account = serializers.Field(source='account.username')
    sprint_total = serializers.Field(source='get_sprint_total')
    active_total = serializers.Field(source='get_active_total')
    burndown = serializers.Field(source='get_burndown')
    tasks = serializers.RelatedField(many=True)

    class Meta:
        model = Sprint
        fields = (
            'id',
            'account',
            'name',
            'date_start',
            'date_finish',
            'tasks',
            'sprint_total',
            'active_total',
            'burndown',
        )