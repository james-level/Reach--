#!/usr/bin/env python
from __future__ import print_function

import os
import sys
import random

# print(sys.path)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'social.settings')

import django
django.setup()

from social_reach.models import Category, Page, ProfileLikedByActiveUser, ProfileGreetedByActiveUser, UserProfile
from django.contrib.auth.models import User

def populate():

	bond = add_user('jamesbond007','s@mail','p')
	may = add_user('TheresaPM','s@mail','p')
	kimk = add_user('Kimk','s@mail','p')
	moran = add_user('DylanMoran','s@mail','p')
	davidsdog = add_user('dudley','s@mail','p')

	bondprofile = add_profile(bond, 'profile_images/bond.jpeg', 'piercebrosnanofficial', 802038, 'ldnmgmt', 23, 'jamesbond007', 104000)
	mayprofile = add_profile(may, 'profile_images/download.jpeg', 'theresamay', 83750, 'ldnmgmt', 1, 'webcameronuk', 23520)
	kimkprofile = add_profile(kimk, 'profile_images/django_kard.jpeg', 'theresamay', 83750, 'ldnmgmt', 5000, 'kanyewest', 4771895)
	davidsdogprofile = add_profile(davidsdog, 'profile_images/dudley.png', 'doodlesdawg', 2171, 'ldnmgmt', 4343, 'Littleking0007', 286557)
	moranprof = add_profile(moran, 'profile_images/moran.jpg', 'the_dylan_moran', 12523, 'ldnmgmt', 4, 'foilarmsandhog', 197319)

	travel_insta = [{
		'title': 'Scarborough Waterfront',
		'url': 'https://www.python.org/'
	},{
		'title': 'Las Ramblas',
		'url': 'https://docs.python.org/2/'
	},{
		'title': 'Il Duomo, Firenze',
		'url': 'https://docs.python.org/3/'
	},{
		'title': 'La Rochelle',
		'url': 'https://learnpythonthehardway.org/book/'
	}]

	food_insta = [{
		'title': 'Gf made vegan waffles...',
		'url': 'https://www.djangoproject.com/'
	},{
		'title': 'Salmon on rye bread',
		'url': 'https://docs.djangoproject.com/en/1.10/intro/tutorial01/'
	},{
		'title': 'Artisan fish and chips',
		'url': 'http://www.tangowithdjango.com/'
	},{
		'title': 'Boeuf Bourguignon',
		'url': 'https://www.reddit.com/r/django'
	}]

	animals_insta = [{
		'title': 'Big grizzly broke out of Ed zoo!',
		'url': 'http://bottlepy.org/docs/dev/index.html'
	},{
		'title': 'My dog fighting the neighbourhood rabbit',
		'url': 'http://flask.pocoo.org/'
	}]

	concerts_insta = [{
		'title': 'Beatles reunion show',
		'url': 'http://bottlepy.org/docs/dev/index.html#'
	},{
		'title': 'Jay and Beyonce',
		'url': 'http://flask.pocoo.org/'
	}]

	categories = {
        'Travel': {'pages': travel_insta, 'views': 128, 'likes': 64},
        'Food': {'pages': food_insta, 'views': 64, 'likes': 32},
        'Animals': {'pages': animals_insta, 'views': 32, 'likes': 16},
        'Concerts': {'pages': concerts_insta, 'views': 23, 'likes': 56}
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

def add_user(username,email,password):

    if len(User.objects.filter(username=username))>0:
        return User.objects.get(username=username)
    u = User.objects.create_user(username, email, password)
    u.save()
    return u

def add_profile(user, picture, instagram_handle, instagram_followers, twitter_handle, twitter_followers, youtube_handle, youtube_followers, likes=0, greetings=0, website=""):

    if len(UserProfile.objects.filter(user=user))>0:
        return UserProfile.objects.get(user=user)
    prof = UserProfile.objects.get_or_create(user=user, picture=picture, instagram_handle=instagram_handle, instagram_followers=instagram_followers, twitter_handle=twitter_handle, twitter_followers=twitter_followers, youtube_handle=youtube_handle, youtube_followers=youtube_followers)[0]
    prof.save()
    return prof

def add_greeted_profile(profile, greeter):
	greeted_profile = ProfileGreetedByActiveUser.get_or_create(profile=profile, greeter=greeter)
	greeted_profile.save()

def add_liked_profile(profile, liker):
	liked_profile = ProfileLikedByActiveUser.get_or_create(profile=profile, liker=liker)
	liked_profile.save()

def delete_all_greeted_profiles():
	ProfileGreetedByActiveUser.objects.all().delete()

def delete_all_liked_profiles():
	ProfileLikedByActiveUser.objects.all().delete()

if __name__ == '__main__':
	print("Starting Social population script...")
	populate()
