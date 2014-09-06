from rest_framework import serializers
from sprints.models import Sprint
from tasks.models import Task


class BasicTaskSerializer(serializers.ModelSerializer):
    account = serializers.Field(source='account.username')
    backlog = serializers.BooleanField(source='is_backlog', read_only=True)

    class Meta:
        model = Task
        fields = (
            'id',
            'account',
            'title',
            'description',
            'category',
            'completed',
            'backlog',
            'weight',
            'date_added',
            'date_closed',
        )


class SprintSerializer(serializers.HyperlinkedModelSerializer):
    account = serializers.Field(source='account.username')
    sprint_total = serializers.Field(source='get_sprint_total')
    active_total = serializers.Field(source='get_active_total')
    burndown = serializers.Field(source='get_burndown')
    tasks = BasicTaskSerializer(many=True, read_only=True)
    active = serializers.Field(source='is_active')

    class Meta:
        model = Sprint
        fields = (
            'id',
            'account',
            'name',
            'date_start',
            'date_finish',
            'active',
            'tasks',
            'sprint_total',
            'active_total',
            'burndown',
        )

