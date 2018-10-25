from __future__ import unicode_literals
from datetime import datetime

from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

GENDER_CHOICES = [(i, i) for i in range(-100,100)]

LOOKING_FOR = {
	('Guys', 'Guys'),
	('Girls', 'Girls'),
	('Any', 'Any')
}


class Category(models.Model):
	name = models.CharField(max_length=128, unique=True)
	views = models.IntegerField(default=0)
	likes = models.IntegerField(default=0)
	slug = models.SlugField(unique=True, default="")

	def save(self, *args, **kwargs):
		self.slug = slugify(self.name)
		super(Category, self).save(*args, **kwargs)

	class Meta:
		verbose_name_plural = 'categories'

	def __unicode__(self):
		return self.name


class Page(models.Model):
	category = models.ForeignKey(Category)
	title = models.CharField(max_length=128)
	url = models.URLField()
	views = models.IntegerField(default=0)

	def __unicode__(self):
		return self.title


class UserProfile(models.Model):
	user = models.OneToOneField(User)
	name = models.CharField(max_length=128, default="")
	bio = models.CharField(max_length=500, default="No description yet... this user must be shy!" )
	looking_for = models.CharField(choices=LOOKING_FOR, max_length=6)
	date_of_birth = models.DateField(default=datetime.now())
	gender_identity = models.IntegerField(choices=GENDER_CHOICES, default=0)
	location = models.CharField(max_length=128, default="")
	latitude = models.FloatField(default=0)
	longitude = models.FloatField(default=0)
	likes = models.IntegerField(default=0)
	greetings = models.IntegerField(default=0)
	website = models.URLField(blank=True)
	picture = models.ImageField(upload_to='profile_images',blank=True)
	picture_two = models.ImageField(upload_to='profile_images',blank=True)
	picture_three = models.ImageField(upload_to='profile_images',blank=True)
	picture_four = models.ImageField(upload_to='profile_images',blank=True)
	picture_five = models.ImageField(upload_to='profile_images',blank=True)
	picture_six = models.ImageField(upload_to='profile_images',blank=True)
	instagram_handle = models.CharField(max_length=128, default="")
	instagram_followers = models.IntegerField(default=0)
	twitter_handle = models.CharField(max_length=128, default="")
	twitter_followers = models.IntegerField(default=0)
	youtube_handle = models.CharField(max_length=128, default="")
	youtube_followers = models.IntegerField(default=0)
	liked_profiles = models.ManyToManyField(User, related_name='liked_user', blank=True)
	ignored_profiles = models.ManyToManyField(User, related_name='ignored_user', blank=True)
	non_smoker = models.NullBooleanField( default=False)
	vegan = models.NullBooleanField(  default=False)
	prefers_chill_to_gym = models.NullBooleanField( default=False)
	childless = models.NullBooleanField(  default=False)
	see_only_non_parents = models.NullBooleanField(null=True , default=None)
	see_only_gym = models.NullBooleanField(null=True , default=None)
	see_only_vegans = models.NullBooleanField(null=True ,default=None)
	see_only_non_smokers = models.NullBooleanField(null=True, default=None)
	min_age_desired = models.IntegerField(default=16)
	max_age_desired = models.IntegerField(default=99)
	max_distance_acceptable = models.IntegerField(default=50)

	def __unicode__(self):
		return self.user.username

class ProfileLikedByActiveUser(models.Model):
	profile = models.CharField(max_length=128)
	liker = models.ForeignKey(UserProfile, related_name='liker')

	def __unicode__(self):
		return self.profile

class ProfileGreetedByActiveUser(models.Model):
	profile = models.CharField(max_length=128)
	greeter = models.ForeignKey(UserProfile, related_name='greeter', default='')


	def __unicode__(self):
		return self.profile

class Match(models.Model):
	first_user = models.ForeignKey(UserProfile, related_name='first', default='')
	second_user = models.ForeignKey(UserProfile, related_name='second', default='')
