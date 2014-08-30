from django.contrib import admin
from tasks.models import Task, Category


@admin.register(Task, Category)
class TaskAdmin(admin.ModelAdmin):
    pass