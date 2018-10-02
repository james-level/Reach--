#!/usr/bin/env python
from __future__ import print_function

import os
import sys
import random

# print(sys.path)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tango_with_django_project.settings')

import django
django.setup()

from rango.models import Category, Page, ProfileLikedByActiveUser, ProfileGreetedByActiveUser

def populate():

	python_pages = [{
		'title': 'Python Homepage',
		'url': 'https://www.python.org/'
	},{
		'title': 'Python 2 Documentation',
		'url': 'https://docs.python.org/2/'
	},{
		'title': 'Python 3 Documentation',
		'url': 'https://docs.python.org/3/'
	},{
		'title': 'Learn Python the Hard Way - Book',
		'url': 'https://learnpythonthehardway.org/book/'
	}]

	django_pages = [{
		'title': 'Django Homepage',
		'url': 'https://www.djangoproject.com/'
	},{
		'title': 'Django Official Tutorial',
		'url': 'https://docs.djangoproject.com/en/1.10/intro/tutorial01/'
	},{
		'title': 'Tango with Django',
		'url': 'http://www.tangowithdjango.com/'
	},{
		'title': 'Django on Reddit',
		'url': 'https://www.reddit.com/r/django'
	}]

	other_pages = [{
		'title': 'Bottle: Python web framework',
		'url': 'http://bottlepy.org/docs/dev/index.html#'
	},{
		'title': 'Flask (A python microframework)',
		'url': 'http://flask.pocoo.org/'
	}]

	categories = {
        'Travel': {'pages': python_pages, 'views': 128, 'likes': 64},
        'Food': {'pages': django_pages, 'views': 64, 'likes': 32},
        'Animals': {'pages': other_pages, 'views': 32, 'likes': 16}
        'Concerts': {'pages': other_pages, 'views': 23, 'likes': 56}
    }

	for cat, cat_data in categories.items():
		views = cat_data['views']
		likes = cat_data['likes']
		c = add_category(cat, views, likes)
		for page in cat_data['pages']:
			add_page(c, page['title'], page['url'])

	for c in Category.objects.all():
		for p in Page.objects.filter(category=c):
			print("- {0} - {1}".format(str(c), str(p)))

	delete_all_greeted_profiles()


def add_category(category_name, views, likes):
	c = Category.objects.get_or_create(name=category_name)[0]
	c.views = views
	c.likes = likes
	c.save()

	return c

def add_page(category, title, url, views=0):
	p = Page.objects.get_or_create(category=category, title=title)[0]
	p.url = url
	p.views = random.randint(0,1000)
	p.save()

	return p

def add_greeted_profile(profile, greeter):
	greeted_profile = ProfileGreetedByActiveUser.get_or_create(profile=profile, greeter=greeter)
	greeted_profile.save()

def add_liked_profile(profile, liker):
	liked_profile = ProfileGreetedByActiveUser.get_or_create(profile=profile, liker=liker)
	liked_profile.save()

def delete_all_greeted_profiles():
	ProfileGreetedByActiveUser.objects.all().delete()

def delete_all_liked_profiles():
	ProfileLikedByActiveUser.objects.all().delete()

if __name__ == '__main__':
	print("Starting Rango population script...")
	populate()
