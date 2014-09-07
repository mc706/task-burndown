# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_task_sprint'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='categories',
            new_name='category',
        ),
    ]
