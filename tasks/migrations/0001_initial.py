# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('account', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('completed', models.BooleanField(default=False)),
                ('weight', models.IntegerField()),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('date_closed', models.DateTimeField(blank=True)),
                ('account', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('categories', models.ForeignKey(to='tasks.Category')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
