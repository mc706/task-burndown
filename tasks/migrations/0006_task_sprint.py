# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sprints', '0004_remove_sprint_active'),
        ('tasks', '0005_auto_20140907_0246'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='sprint',
            field=models.ManyToManyField(related_name=b'tasks', null=True, to='sprints.Sprint', blank=True),
            preserve_default=True,
        ),
    ]
