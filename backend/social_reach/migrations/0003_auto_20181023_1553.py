# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-10-23 15:53
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social_reach', '0002_auto_20181023_1549'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='zeroth_picture',
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2018, 10, 23, 15, 53, 30, 624688)),
        ),
    ]
