from rest_framework import serializers
from .models import Category, UserProfile, Match, ProfileLikedByActiveUser
from django.contrib.auth.models import User
from social_reach.instagram_scraper import InstagramScraper
from social_reach.twitter_scraper import TwitterScraper
from social_reach.youtube_scraper import YoutubeScraper


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "views")


class ProfileSerializer(serializers.ModelSerializer):
    # Following line converts user id to username

    def create(self, validated_data):
        profile = UserProfile(
            user=validated_data.get('user', None),
            likes=validated_data.get('likes', 0),
            greetings=validated_data.get('greetings', 0),
            picture=validated_data.get('picture', None),
            instagram_handle=validated_data.get('instagram_handle', None),
            twitter_handle=validated_data.get('twitter_handle', None),
            youtube_handle=validated_data.get('youtube_handle', None),
            instagram_followers=validated_data.get('instagram_followers', 0),
            twitter_followers=validated_data.get('twitter_followers', 0),
            youtube_followers=validated_data.get('youtube_followers', 0),
        )
        instagram_scraper =  InstagramScraper()
        insta_results = instagram_scraper.scrape_instagram_followers(profile.instagram_handle)
        profile.instagram_followers=profile.instagram_followers + insta_results
        profile.save()
        return profile

    def update(self, instance, validated_data):
        for field in validated_data:

            if field == 'instagram_followers':
                instagram_scraper =  InstagramScraper()
                insta_results = instagram_scraper.scrape_instagram_followers(validated_data.get('instagram_handle'))
                instance.__setattr__('instagram_followers',  insta_results )

            elif field == 'twitter_followers':
                twitter_scraper =  TwitterScraper()
                twitter_results = twitter_scraper.scrape_twitter_followers(validated_data.get('twitter_handle'))
                instance.__setattr__('twitter_followers',  twitter_results )

            else:
                instance.__setattr__(field, validated_data.get(field))
        instance.save()
        return instance

    class Meta:
        model = UserProfile
        fields = ("user", "likes", "greetings", "picture", "instagram_handle", "twitter_handle", "youtube_handle", "instagram_followers", "twitter_followers", "youtube_followers")

        extra_kwargs = {
            'url': {
                'view_name': 'social_reach: profile_detail',
            }
        }

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User(
            username=validated_data.get('username', None)
        )
        user.set_password(validated_data.get('password', None))
        user.save()
        return user

    def update(self, instance, validated_data):
        for field in validated_data:
            if field == 'password':
                instance.set_password(validated_data.get(field))
            else:
                instance.__setattr__(field, validated_data.get(field))
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ("username", "email", "password", "id")

        extra_kwargs = {
            'url': {
                'view_name': 'social_reach: user_detail',
            }
        }

class MatchSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        match = Match(
            first_user=validated_data.get('first_user', None),
            second_user=validated_data.get('second_user', None),
        )
        match.save()
        return match

    def update(self, instance, validated_data):
        for field in validated_data:
                instance.__setattr__(field, validated_data.get(field))
        instance.save()
        return instance


    class Meta:
        model = Match
        fields = ("first_user", "second_user", "id")

        extra_kwargs = {
            'url': {
                'view_name': 'social_reach: match_detail',
            }
        }


class LikeSerializer(serializers.ModelSerializer):


    def create(self, validated_data):
        like = ProfileLikedByActiveUser(liker=validated_data.get('liker', None),
        profile=validated_data.get('profile', None))
        like.save()
        return like

    class Meta:
        model = ProfileLikedByActiveUser
        fields = ('liker', 'profile', 'id')

        extra_kwargs = {
            'url': {
                'view_name': 'social_reach: like_detail',
            }
        }
