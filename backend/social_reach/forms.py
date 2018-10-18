from django import forms
from social_reach.models import Page, Category
from social_reach.models import UserProfile
from django.contrib.auth.models import User

class CategoryForm(forms.ModelForm):
    name = forms.CharField(max_length=128, help_text="Please enter the category name.")
    views = forms.IntegerField(widget=forms.HiddenInput(), initial=0)
    likes = forms.IntegerField(widget=forms.HiddenInput(), initial=0)

    class Meta:
        model = Category

        fields = ('name', 'views', 'likes')

class PageForm(forms.ModelForm):
    title = forms.CharField(max_length=128, help_text="Enter page title.")
    url = forms.URLField(max_length=128, help_text="Enter URL")
    views = forms.IntegerField(widget=forms.HiddenInput(), initial=0)

    class Meta:
        model = Page

        fields = ('title', 'url', 'views')

    def clean(self):
        cleaned_data = self.cleaned_data
        url = cleaned_data.get('url')

        if url and not url.startswith('https://'):
            url = 'https://' + url
            cleaned_data['url'] = url

        return cleaned_data


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User

        fields = ('username', 'email', 'password')



class UserProfileForm(forms.ModelForm):


    class Meta:
        model = UserProfile

        fields = ('website', 'picture', 'instagram_handle', 'twitter_handle', 'youtube_handle', 'liked_profiles', 'ignored_profiles')
