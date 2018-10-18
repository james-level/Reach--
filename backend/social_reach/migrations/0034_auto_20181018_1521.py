# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-10-18 15:21
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social_reach', '0033_auto_20181017_1039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='bio',
            field=models.CharField(default='No description yet... this user must be shy!', max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2018, 10, 18, 15, 21, 24, 906356)),
        ),
    ]