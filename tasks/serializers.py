from rest_framework import serializers
from tasks.models import Task, Category


class TaskSerializer(serializers.ModelSerializer):
    account = serializers.Field(source='account.username')
    #sprint = serializers.RelatedField(source='sprint')
    backlog = serializers.BooleanField(source='is_backlog', read_only=True)
    date_closed = serializers.DateTimeField(read_only=True)

    def validate_category(self, attrs, source):
        """
        validate that category is owned by user
        """
        category = attrs[source]
        if category.account != self.context['request'].user:
            raise serializers.ValidationError("You do not have access to this category")
        return attrs

    def validate_sprint(self, attrs, source):
        """
        validate that category is owned by user
        """
        if source in attrs:
            sprint = attrs[source]
            if hasattr(sprint, 'account') and sprint.account != self.context['request'].user:
                raise serializers.ValidationError("You do not have access to this sprint")
        return attrs

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
            'date_added',
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