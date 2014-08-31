from rest_framework import serializers
from tasks.models import Task, Category


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    account = serializers.Field(source='account.username')

    class Meta:
        model = Task
        fields = (
            'id',
            'account',
            'title',
            'description',
            'categories',
            'completed',
            'weight',
            'date_closed',
        )


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    account = serializers.Field(source='account.username')

    class Meta:
        model = Category
        fields = (
            'id',
            'account',
            'name',
        )