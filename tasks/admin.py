from django.contrib import admin
from tasks.models import Task, Category


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'weight', 'completed', 'date_added', 'date_closed']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['account', 'name']