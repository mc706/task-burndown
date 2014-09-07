# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_auto_20140831_1417'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='sprint',
        ),
        migrations.AlterField(
            model_name='task',
            name='category',
            field=models.ForeignKey(related_name=b'tasks', to='tasks.Category'),
        ),
    ]
