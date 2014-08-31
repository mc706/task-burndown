# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tasks', '0002_auto_20140830_2253'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sprint',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(help_text=b'Sprint Name', max_length=100, blank=True)),
                ('date_start', models.DateField()),
                ('date_finish', models.DateField()),
                ('account', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('tasks', models.ManyToManyField(to='tasks.Task', null=True, blank=True)),
            ],
            options={
                'ordering': [b'date_start'],
                'get_latest_by': b'date_start',
            },
            bases=(models.Model,),
        ),
    ]
