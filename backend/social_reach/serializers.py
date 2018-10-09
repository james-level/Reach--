from rest_framework import serializers
from .models import Category, UserProfile, Match, ProfileLikedByActiveUser
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "views")

class ProfileSerializer(serializers.ModelSerializer):
    # Following line converts user id to username
    user = serializers.ReadOnlyField(source='user.username')

    def create(self, validated_data):
        profile = UserProfile(
            user=validated_data.get('user', None)
        )
        profile.set_user(validated_data.get('user', None))
        profile.save()
        return profile

    def update(self, instance, validated_data):
        for field in validated_data:
            if field == 'user':
                instance.set_user(validated_data.get(field))
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
    first_username = serializers.ReadOnlyField(source='first_user.user.username')
    second_username = serializers.ReadOnlyField(source='second_user.user.username')

    class Meta:
        model = Match
        fields = ("first_username", "second_username")

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileLikedByActiveUser
        fields = ('liker', 'profile')
