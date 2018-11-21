from rest_framework import serializers
from .models import Category, UserProfile, Match, ProfileLikedByActiveUser
from django.contrib.auth.models import User
from social_reach.instagram_scraper import InstagramScraper
from social_reach.twitter_scraper import TwitterScraper
from social_reach.youtube_scraper import YoutubeScraper
from datetime import datetime

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "views")

class ProfileSerializer(serializers.ModelSerializer):
    # picture = serializers.ImageField(max_length=None, use_url=False, required=False)
    # picture_six = serializers.ImageField(max_length=None, use_url=False, required=False)
    # picture_two = serializers.ImageField(max_length=None, use_url=False, required=False)
    # picture_three = serializers.ImageField(max_length=None, use_url=False, required=False)
    # picture_four = serializers.ImageField(max_length=None, use_url=False, required=False)
    # picture_five = serializers.ImageField(max_length=None, use_url=False, required=False)
    # Following line converts user id to username
    def create(self, validated_data):

        profile = UserProfile(
            user=validated_data.get('user', None),
            name=validated_data.get('name', None),
            bio=validated_data.get('bio', "No description yet... this user must be shy!"),
            looking_for=validated_data.get('looking_for', None),
            date_of_birth=validated_data.get('date_of_birth', datetime.now()),
            gender_identity=validated_data.get('gender_identity', None),
            location=validated_data.get('location', ""),
            likes=validated_data.get('likes', 0),
            greetings=validated_data.get('greetings', 0),
            picture=validated_data.get('picture', None),
            picture_two=validated_data.get('picture_two', None),
            picture_three=validated_data.get('picture_three', None),
            picture_four=validated_data.get('picture_four', None),
            picture_five=validated_data.get('picture_five', None),
            picture_six=validated_data.get('picture_six', None),
            instagram_handle=validated_data.get('instagram_handle', ''),
            twitter_handle=validated_data.get('twitter_handle', ''),
            youtube_handle=validated_data.get('youtube_handle', ''),
            instagram_followers=validated_data.get('instagram_followers', 0),
            twitter_followers=validated_data.get('twitter_followers', 0),
            youtube_followers=validated_data.get('youtube_followers', 0),
            non_smoker = validated_data.get('non_smoker', False),
        	vegan = validated_data.get('vegan', False),
        	prefers_chill_to_gym = validated_data.get('prefers_chill_to_gym', False),
        	childless = validated_data.get('childless', False),

        )
        if profile.bio is None:
            profile.bio = "No description yet... this user must be shy!"
        instagram_scraper =  InstagramScraper()
        insta_results = instagram_scraper.scrape_instagram_followers(profile.instagram_handle)
        profile.instagram_followers=profile.instagram_followers + insta_results
        twitter_scraper =  TwitterScraper()
        twitter_results = twitter_scraper.scrape_twitter_followers(profile.twitter_handle)
        profile.twitter_followers=profile.twitter_followers + twitter_results
        youtube_scraper =  YoutubeScraper()
        youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        if youtube_results == 0:
            youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
        profile.youtube_followers=profile.youtube_followers + youtube_results
        profile.save()
        # Adding liked profiles after saving the profile as the ManyToMany relationship requires the object to have an ID before being used
        profile.liked_profiles=validated_data.get('liked_profiles', [])
        profile.ignored_profiles=validated_data.get('ignored_profiles', [])
        profile.save()
        return profile

    # def partial_update(self, request, *args, **kwargs):
    #     kwargs['partial'] = True
    #     print("HELLO RUNNING")
    #     return self.update(request, instance, validated_data)

    def update(self, instance, validated_data):

        print("RUNNNNNING", validated_data)

        for field in validated_data:
            if field == 'instagram_followers':
                instagram_scraper =  InstagramScraper()
                print("RUNNING INSTA")
                if validated_data.get('instagram_handle') is not None:
                    insta_results = instagram_scraper.scrape_instagram_followers(validated_data.get('instagram_handle'))
                    instance.__setattr__('instagram_followers',  insta_results )
            elif field == 'twitter_followers':
                twitter_scraper =  TwitterScraper()
                if validated_data.get('twitter_handle') is not None:
                    twitter_results = twitter_scraper.scrape_twitter_followers(validated_data.get('twitter_handle'))
                    instance.__setattr__('twitter_followers',  twitter_results )
            elif field == 'youtube_followers':
                if validated_data.get('youtube_handle') is not None:
                    youtube_scraper =  YoutubeScraper()
                    youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    if youtube_results == 0:
                        youtube_results = youtube_scraper.scrape_youtube_followers(validated_data.get('youtube_handle'))
                    instance.__setattr__('youtube_followers',  youtube_results )

            # Implementing funtionality for incrementing likes and dislikes of swiped profiles
            elif field == 'liked_profiles':
                instance.__setattr__('liked_profiles', validated_data.get('liked_profiles'))

                for profile in validated_data.get('liked_profiles'):
                    related_profile = UserProfile.objects.get(user=profile)
                    print("RELATED PROFILE", related_profile)
                    related_profile.likes = related_profile.likes + 1
                    related_profile.save()
            elif field == 'ignored_profiles':
                instance.__setattr__('ignored_profiles', validated_data.get('ignored_profiles'))
                print("RUNNINGNGGGG")
                for profile in validated_data.get('ignored_profiles'):
                    related_profile = UserProfile.objects.get(user=profile)
                    print("IGNORE RELATED PROFILE", related_profile)
                    related_profile.greetings = related_profile.greetings + 1
                    related_profile.save()
            else:
                instance.__setattr__(field, validated_data.get(field))
        instance.save()
        return instance


    class Meta:
        model = UserProfile
        fields = ("user", "name", "bio", "looking_for", "date_of_birth", "gender_identity", "location", "latitude", "longitude", "likes", "greetings", "picture", "picture_two", "picture_three", "picture_four", "picture_five", "picture_six", "instagram_handle", "twitter_handle", "youtube_handle", "instagram_followers", "twitter_followers", "youtube_followers", "liked_profiles", "ignored_profiles","non_smoker","vegan","prefers_chill_to_gym","childless","see_only_non_parents","see_only_gym","see_only_vegans","see_only_non_smokers", "min_age_desired", "max_age_desired", "max_distance_acceptable")

        extra_kwargs = {
            'url': {
                'view_name': 'social_reach: profile_detail',
            }
        }
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    def create(self, validated_data):
        user = User(
            username=validated_data.get('username', None),
            email=validated_data.get('email', None),

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
        fields = ("username", "email", "password", "id", "is_active")
        extra_kwargs = {
            'url': {
                'view_name': 'social_reach: user_detail',
                'view_name': 'social_reach: current_user_detail',
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
