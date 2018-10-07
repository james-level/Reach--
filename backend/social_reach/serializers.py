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

    class Meta:
        model = UserProfile
        fields = ("user", "likes", "greetings", "picture", "instagram_handle", "twitter_handle", "youtube_handle", "instagram_followers", "twitter_followers", "youtube_followers")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password", "id")

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
