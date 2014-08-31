# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sprints', '0001_initial'),
        ('tasks', '0002_auto_20140830_2253'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='sprint',
            field=models.ForeignKey(blank=True, to='sprints.Sprint', null=True),
            preserve_default=True,
        ),
    ]
