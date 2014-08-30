from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    """
    Stores a single task.
    account ties task with a :model:`auth.User`
    categories tie task with :model:`tasks.Category`
    """
    account = models.ForeignKey(User)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    categories = models.ForeignKey("Category")

    completed = models.BooleanField(default=False)

    weight = models.IntegerField()

    date_added = models.DateTimeField(auto_now_add=True)
    date_closed = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return self.title


class Category(models.Model):
    """
    Stores User Categories
    account ties category with a :model:`auth.User`
    """
    account = models.ForeignKey(User)
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name