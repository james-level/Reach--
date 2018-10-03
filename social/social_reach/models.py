from __future__ import unicode_literals

from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User


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
	likes = models.IntegerField(default=0)
	greetings = models.IntegerField(default=0)
	website = models.URLField(blank=True)
	picture = models.ImageField(upload_to='profile_images',blank=True)
	instagram = models.CharField(max_length=128, default="")
	instagram_followers = models.IntegerField(default=0)

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
