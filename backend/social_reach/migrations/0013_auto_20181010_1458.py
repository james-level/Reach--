# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-10-10 13:58
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social_reach', '0012_auto_20181010_1456'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2018, 10, 10, 14, 58, 1, 358000)),
        ),
    ]
