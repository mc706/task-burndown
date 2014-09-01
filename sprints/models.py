import datetime
from django.db import models
from django.contrib.auth.models import User


class Sprint(models.Model):
    """
    Model to have a sprint
    account related to :model:`auth.User`
    related to :model:`tasks.Task`

    """
    account = models.ForeignKey(User)
    name = models.CharField(max_length=100, blank=True, help_text="Sprint Name")
    date_start = models.DateField()
    date_finish = models.DateField()

    def __unicode__(self):
        return self.name

    def get_sprint_total(self):
        return sum([task.weight for task in self.tasks.all()])

    def get_active_total(self):
        return sum({task.weight for task in self.tasks.all() if not task.completed})

    def get_burndown(self):
        burndown = [self.get_sprint_total()]
        days = (self.date_start + datetime.timedelta(n) for n in range((self.date_finish - self.date_start).days))
        for day in days:
            tasks = self.tasks.filter(completed=True)
            burndown.append(burndown[-1] - sum([task.weight for task in tasks if task.date_closed.date()==day]))
        return burndown

    class Meta:
        get_latest_by = 'date_start'
        ordering = ['date_start']