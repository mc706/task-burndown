from django.contrib import admin
from tasks.models import Task, Category


@admin.register(Task, Category)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'sprints', 'weight', 'completed', 'date_added', 'date_closed']