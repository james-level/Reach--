# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from social_reach.models import Category, Page, UserProfile, Match

# Register your models here.

class PageAdmin(admin.ModelAdmin):
     list_display = ('title', 'category', 'url')

    # def __unicode__(self):
    #     return self.name

admin.site.register(Category)
admin.site.register(Page, PageAdmin)
admin.site.register(UserProfile)
admin.site.register(Match)
