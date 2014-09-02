# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sprints', '0002_remove_sprint_tasks'),
    ]

    operations = [
        migrations.AddField(
            model_name='sprint',
            name='active',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
