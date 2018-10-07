from rest_framework import serializers
from .models import Category, UserProfile
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "views")

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("user", "likes", "instagram_handle", "twitter_handle", "youtube_handle", "instagram_followers", "twitter_followers", "youtube_followers")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("user_id", "username")
