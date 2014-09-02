# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sprints', '0003_sprint_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sprint',
            name='active',
        ),
    ]
