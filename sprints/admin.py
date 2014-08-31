from django.contrib import admin
from sprints.models import Sprint


@admin.register(Sprint)
class SprintAdmin(admin.ModelAdmin):
    pass