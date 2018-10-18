# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-10-18 13:07
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('social_reach', '0035_auto_20181018_1241'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='ignored_profiles',
            field=models.ManyToManyField(default=[], related_name='ignored_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2018, 10, 18, 13, 7, 7, 847574)),
        ),
    ]