from rest_framework import serializers
from tasks.models import Task, Category


class TaskSerializer(serializers.ModelSerializer):
    account = serializers.Field(source='account.username')
    #sprint = serializers.RelatedField(source='sprint')
    backlog = serializers.BooleanField(source='is_backlog', read_only=True)

    class Meta:
        model = Task
        fields = (
            'id',
            'account',
            'title',
            'sprint',
            'description',
            'category',
            'completed',
            'backlog',
            'weight',
            'date_closed',
        )


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    account = serializers.Field(source='account.username')
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = (
            'id',
            'account',
            'name',
            'tasks',
        )