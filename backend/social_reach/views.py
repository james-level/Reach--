# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import requests

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import generics
from activation_tokens import TokenGenerator
from datetime import datetime
from .models import Category
from .distance import approximate_distance_between_two_points;
from .serializers import CategorySerializer, ProfileSerializer, UserSerializer, MatchSerializer, LikeSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.mail import send_mail
from django.forms.models import model_to_dict
from social import settings as ReachSettings
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.utils.encoding import force_bytes, force_text
from django.shortcuts import redirect
from django.shortcuts import render
from registration.backends.simple.views import RegistrationView
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.csrf import requires_csrf_token
from django.core.urlresolvers import reverse
from djoser.compat import get_user_email
from django.db.models import Q
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from datetime import datetime
from django.contrib.auth.models import User

from social_reach.models import Category, Page, UserProfile, ProfileLikedByActiveUser, ProfileGreetedByActiveUser, Match
from social_reach.forms import CategoryForm, PageForm
from social_reach.forms import UserForm, UserProfileForm
from django.template.loader import render_to_string
from social_reach.instagram_scraper import InstagramScraper
from social_reach.twitter_scraper import TwitterScraper
from social_reach.youtube_scraper import YoutubeScraper
from access_tokens_fb import facebook_app_token , facebook_access_token

from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_auth.registration.serializers import VerifyEmailSerializer
from rest_framework import status
from rest_framework.decorators import api_view, APIView
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from djoser import utils, signals
from djoser.conf import settings
from rest_framework import generics, permissions, status, views, viewsets
from django.contrib.auth.tokens import default_token_generator
from djoser import views as djoserviews

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime

from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import (
    JSONWebTokenSerializer, RefreshJSONWebTokenSerializer,
    VerifyJSONWebTokenSerializer
)

jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


def user_confirm(request, uidb64, token):
    queryset = User.objects.all()


    uid = force_text(urlsafe_base64_decode(uidb64))
    user_to_confirm = User.objects.get(pk=uid)
    print("USER TO CONFIRM", user_to_confirm)
    print("USER TO CONFIRM TOKEN VALID", TokenGenerator().check_token(user_to_confirm, token))
    print("USER TO CONFIRM ACTIVE ALREADY?", user_to_confirm.is_active)

    if user_to_confirm and TokenGenerator().check_token(user_to_confirm, token):
        user_to_confirm.is_active = True
        print("USER TO CONFIRM SET TO ACTIVE?", user_to_confirm.is_active)
        user_to_confirm.save()
    # make sure to catch 404's below

        context = {'user': user_to_confirm}
        print("USER STATUS", user_to_confirm.is_active)

        message = render_to_string('../templates/reach/account_confirm.html',{'token': token})
        msg = EmailMessage('Reach account confirmation for ' + user_to_confirm.username.capitalize(),
        message,
        ReachSettings.EMAIL_HOST_USER,
        [    ReachSettings.EMAIL_HOST_USER,
    user_to_confirm.email],
        headers={}
        )
        msg.content_subtype = "html"
        print("EMAIL", user_to_confirm.email)
        msg.send()

        data = {
            'username': user_to_confirm.username,
            'password': user_to_confirm.password
                }

        r = requests.post('http://localhost:8080/social_reach/api/auth/token/obtain/', data=data)

    return JsonResponse( {'user': model_to_dict(user_to_confirm), 'status': 200, 'text': "User account for " + user_to_confirm.username.capitalize() + " activated." }
, status=201)

def user_reset(request, uidb64, token):
    queryset = User.objects.all()


    uid = force_text(urlsafe_base64_decode(uidb64))
    user_reset = User.objects.get(pk=uid)
    print("USER TO CONFIRM TOKEN VALID", TokenGenerator().check_token(user_reset, token))


    if user_reset and TokenGenerator().check_token(user_reset, token):

    # make sure to catch 404's below

        context = {'user': user_reset}

        data = {
            'username': user_reset.username,
            'password': user_reset.password
                }

        r = requests.post('http://localhost:8080/social_reach/api/auth/token/obtain/', data=data)

    return JsonResponse( {'user': model_to_dict(user_reset), 'status': 200, 'text': "Returned response." }
, status=201)


class UserPasswordReset(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        uid = force_text(urlsafe_base64_decode(self.kwargs['uidb64']))
        user_to_reset = User.objects.get(pk=uid)
        if user_to_reset and TokenGenerator().check_token(user_to_reset, self.kwargs['token']):
            print("Password for " + user_to_reset.username + " has been reset.")
        return user_to_reset

class UserPasswordResetEmail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
    # make sure to catch 404's below
        obj = queryset.get(username=self.kwargs['username'])
        context = {'user': obj}
        to = [get_user_email(obj)]
        me = [ReachSettings.EMAIL_HOST_USER]
        settings.EMAIL.password_reset(self.request, context).send(to)
        settings.EMAIL.password_reset(self.request, context).send(me)
        return obj

class UserCreateView(generics.CreateAPIView):
    """
    Use this endpoint to register new user.
    """
    serializer_class = settings.SERIALIZERS.user_create
    permission_classes = [permissions.AllowAny]
    print("USER default")
    parser_classes = ReachSettings.DEFAULT_PARSER_CLASSES


    def perform_create(self, serializer, uid):
        user = serializer.save()
        signals.user_registered.send(
            sender=self.__class__, user=user, request=self.request
        )

        context = {'user': user}
        to = [get_user_email(user)]
        if settings.SEND_ACTIVATION_EMAIL:
            settings.EMAIL.activation(self.request, context).send(to)
        elif settings.SEND_CONFIRMATION_EMAIL:
            settings.EMAIL.confirmation(self.request, context).send(to)


class ListCategoryView(generics.ListCreateAPIView):
    """
    Provides a get method handler.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ListProfileView(generics.ListCreateAPIView):
    """
    Provides a get method handler.
    """
    queryset = UserProfile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileSerializer(partial=True)
    parser_classes = ReachSettings.DEFAULT_PARSER_CLASSES


    def get_queryset(self):
        # from IPython import embed; embed();
        return UserProfile.objects.all()

class ProfileByUsername(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileSerializer
    queryset = UserProfile.objects.all()


    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
    # make sure to catch 404's below
        user = User.objects.get(username=self.kwargs['username'])
        obj = queryset.get(user=user)
        return obj

class ProfilesWhichMeetSearchCriteria(generics.ListCreateAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.orientation_and_gender_filter(self.age_filter(self.distance_filter()))


    def age_filter(self, queryset):

        today = datetime.today()

        earliest_year = today.year - int(self.kwargs['max_age'])
        latest_year = today.year - int(self.kwargs['min_age'])
        earliest_permissible_dob = datetime(earliest_year, today.month, today.day)
        latest_permissible_dob = datetime(latest_year, today.month, today.day)

        return queryset.filter(date_of_birth__gte=earliest_permissible_dob).filter(date_of_birth__lte=latest_permissible_dob)


    def orientation_and_gender_filter(self, queryset):

        current_user_profile = UserProfile.objects.get(user__username = self.kwargs['username'])

        current_user_gender_number = current_user_profile.gender_identity

        gender_group_current_user_belongs_to = ""
        gender_group_current_user_belongs_to = "Guys" if current_user_gender_number > -1 else "Girls"

        max_gender_number = ""
        min_gender_number = ""
        max_gender_number = 99 if gender_group_current_user_belongs_to == "Guys" else -1
        min_gender_number = 0 if gender_group_current_user_belongs_to == "Guys" else -100

        max_opposite_gender_number = ""
        min_opposite_gender_number = ""
        max_opposite_gender_number = -1 if gender_group_current_user_belongs_to == "Guys" else 100
        min_opposite_gender_number = -100 if gender_group_current_user_belongs_to == "Guys" else 0

        # Instantiating a conditional statement for heterosexuals and homosexuals
        if current_user_profile.looking_for != "Any":
            # Nested conditional for homosexuals
            if current_user_profile.looking_for == gender_group_current_user_belongs_to:
                compatible_profiles = queryset.filter(Q(looking_for=gender_group_current_user_belongs_to) | Q(looking_for="Any"), gender_identity__range=[min_gender_number, max_gender_number]).exclude(user__username=current_user_profile.user)
                return compatible_profiles
                # compatible_profiles = queryset.filter(Q(looking_for=gender_group_current_user_belongs_to) | Q(looking_for="Any"), gender_identity__lte = )
            else:
                compatible_profiles = queryset.filter(Q(looking_for=gender_group_current_user_belongs_to) | Q(looking_for="Any"), gender_identity__range=[min_opposite_gender_number, max_opposite_gender_number]).exclude(user__username=current_user_profile.user)
                return compatible_profiles
        else:
            compatible_profiles = queryset.filter(Q(looking_for=gender_group_current_user_belongs_to) | Q(looking_for="Any")).exclude(user__username=current_user_profile.user)

        return compatible_profiles


    def distance_filter(self):

        max_acceptable_distance = int(self.kwargs['max_distance'])

        current_user_profile = UserProfile.objects.get(user__username = self.kwargs['username'])

        all_profiles = UserProfile.objects.all().exclude(user__username = self.kwargs['username']).order_by('id')

        number_of_profiles = len(User.objects.all().filter(userprofile__isnull = False).exclude(username = self.kwargs['username']).exclude(is_superuser = True, is_staff = True).distinct())

        distances_array = []

        for profile in all_profiles:
            distance_apart = approximate_distance_between_two_points(current_user_profile.latitude, current_user_profile.longitude, profile.latitude, profile.longitude)
            distances_array.append(distance_apart)

        all_profiles_as_list = list(all_profiles)

        profile_ids_to_ignore = []

        for i in range(number_of_profiles - 1, -1, -1):
            if distances_array[i] > max_acceptable_distance:
                profile_ids_to_ignore.append(all_profiles_as_list[i].id)

        profiles_filtered_by_distance = all_profiles.exclude(id__in = profile_ids_to_ignore)

        return profiles_filtered_by_distance


class LikeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LikeSerializer

    def get_queryset(self):
        # from IPython import embed; embed();
        return ProfileLikedByActiveUser.objects.all()

class MatchDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self):
        # from IPython import embed; embed();
        return Match.objects.all()


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
    # make sure to catch 404's below
        obj = queryset.get(id=self.kwargs['pk'])

        return obj

def get_user_password(request, pk):
    user = User.objects.get(id=pk)
    return JsonResponse( {'user': model_to_dict(user), 'status': 200 }
    , status=201)

class CurrentUserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
    # make sure to catch 404's below
        obj = queryset.get(username=self.request.user)
        return obj

class SpecificUserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
    # make sure to catch 404's below
        obj = queryset.get(username=self.kwargs['username'])
        return obj


class ListMatchView(generics.ListCreateAPIView):
    """
    Provides a get method handler.
    """
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

class ListLikesView(generics.ListCreateAPIView):
    """
    Provides a get method handler.
    """
    queryset = ProfileLikedByActiveUser.objects.all()
    serializer_class = LikeSerializer




class JSONWebTokenAPIView(APIView):
    """
    Base API View that various JWT interactions inherit from.
    """
    permission_classes = ()
    authentication_classes = ()

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
            'view': self,
        }

    def get_serializer_class(self):
        """
        Return the class to use for the serializer.
        Defaults to using `self.serializer_class`.
        You may want to override this if you need to provide different
        serializations depending on the incoming request.
        (Eg. admins get full serialization, others get basic serialization)
        """
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__)
        return self.serializer_class

    def get_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            user_to_authenticate = serializer.object.get('user')
            # user_to_authenticate.is_authenticated = True
            # user_to_authenticate.save()
            response_data = jwt_response_payload_handler(token, user, request)
            response = Response(response_data)
            if api_settings.JWT_AUTH_COOKIE:
                expiration = (datetime.utcnow() +
                              api_settings.JWT_EXPIRATION_DELTA)
                response.set_cookie(api_settings.JWT_AUTH_COOKIE,
                                    token,
                                    expires=expiration,
                                    httponly=True)
            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ObtainJSONWebToken(JSONWebTokenAPIView):
    """
    API View that receives a POST with a user's username and password.
    Returns a JSON Web Token that can be used for authenticated requests.
    """
    serializer_class = JSONWebTokenSerializer


class VerifyJSONWebToken(JSONWebTokenAPIView):
    """
    API View that checks the veracity of a token, returning the token if it
    is valid.
    """
    serializer_class = VerifyJSONWebTokenSerializer


class RefreshJSONWebToken(JSONWebTokenAPIView):
    """
    API View that returns a refreshed token (with new expiration) based on
    existing token
    If 'orig_iat' field (original issued-at-time) is found, will first check
    if it's within expiration window, then copy it to the new token
    """
    serializer_class = RefreshJSONWebTokenSerializer


obtain_jwt_token = ObtainJSONWebToken.as_view()
refresh_jwt_token = RefreshJSONWebToken.as_view()
verify_jwt_token = VerifyJSONWebToken.as_view()





class reachRegistrationView(RegistrationView):
	def get_success_url(self, user):
		return '/social_reach/'


def add_page(request, category_slug_url):
        cat_list = get_category_list()
	print category_slug_url
	try:
		category = Category.objects.filter(slug=category_slug_url)[0]
	except Category.DoesNotExist:
		category = None

	print category
	form = PageForm()
	if request.method == 'POST':
		form = PageForm(request.POST)
		if category:
			page = form.save(commit=False)
			page.category = category
			page.views = 0
			page.save()
			return show_category(request, category_slug_url)
		else:
			print form.errors
	_context = {
		'form': form,
		'category': category,
		'title' : 'Add a Page',
        'cat_list': cat_list
	}
	return render(request, 'reach/add_page.html', context=_context)


def add_category(request):
        cat_list = get_category_list()
	form = CategoryForm()



	if request.method == 'POST':
		form = CategoryForm(request.POST)
		if form.is_valid():
			form.save(commit=True)
			return index(request)
		else:
			print(form.errors)


	return render(request, 'reach/add_category.html', {'form':form, 'cat_list': cat_list})


def show_user(request, username):
    context = RequestContext(request)
    context = {}

    cat_list = get_category_list()

    try:
        user = UserProfile.objects.get(user__username=username)
        if len(ProfileGreetedByActiveUser.objects.filter(profile=username, greeter__user__username=request.user)) > 0:
            greeted_user = ProfileGreetedByActiveUser.objects.filter(profile=username, greeter__user__username=request.user)[0]
            context['greeted'] = greeted_user

        user = UserProfile.objects.get(user__username=username)
        if len(ProfileLikedByActiveUser.objects.filter(profile=username, liker__user__username=request.user)) > 0:
            liked_user = ProfileLikedByActiveUser.objects.filter(profile=username, liker__user__username=request.user)[0]
            context['liked'] = liked_user
        print("HELLO")
        context['viewed_user'] = user
        context['cat_list'] = cat_list

    except UserProfile.DoesNotExist:
        context['viewed_user'] = None
        context['cat_list'] = cat_list

    except ProfileGreetedByActiveUser.DoesNotExist:
        context['greeted'] = None
        context['liked'] = liked_user
        context['viewed_user'] = user
        context['cat_list'] = cat_list
    except ProfileLikedByActiveUser.DoesNotExist:
        context['greeted'] = None
        context['liked'] = None
        context['viewed_user'] = user
        context['cat_list'] = cat_list
    return render(request, 'reach/user_profile.html', context=context)



@login_required
def like_user(request):
    context = RequestContext(request)
    user_id = None
    if request.method == 'GET':
        user_id = request.GET['user_id']
    if user_id:
        user = UserProfile.objects.get(id=int(user_id))
        likes = user.likes
	print("Length", len(Match.objects.filter(first_user=user, second_user=UserProfile.objects.get(user__username=request.user))))

        if user:
            if len(ProfileLikedByActiveUser.objects.filter(profile=user.user.username, liker__user__username=request.user)) == 0:
                    likes = user.likes + 1
                    user.likes = likes
                    user.save()
                    liked_profile = ProfileLikedByActiveUser.objects.create(profile=user.user.username, liker= UserProfile.objects.get(user__username=request.user))
                    liked_profile.save()


	if len(ProfileLikedByActiveUser.objects.filter(profile=UserProfile.objects.get(user__username=request.user), liker=user)) == 1:
			user = UserProfile.objects.get(id=int(user_id))
			if len(Match.objects.filter(first_user=user, second_user=UserProfile.objects.get(user__username=request.user))) == 0:
				match = Match.objects.create(first_user=user, second_user=UserProfile.objects.get(user__username=request.user))
				match.save()
				likes = user.likes
				print("MATCHHH", match)
				print("Length", len(Match.objects.filter(first_user=user, second_user=UserProfile.objects.get(user__username=request.user))))

    	return HttpResponse(likes)
    return HttpResponse(likes)


@login_required
def greet_user(request):
    context = RequestContext(request)
    user_id = None
    if request.method == 'GET':
        user_id = request.GET['user_id']
    if user_id:
        user = UserProfile.objects.get(id=int(user_id))
        greetings = user.greetings
        if user:
            if len(ProfileGreetedByActiveUser.objects.filter(profile=user.user.username, greeter__user__username=request.user)) == 0:
                greetings = user.greetings + 1
                user.greetings = greetings
                user.save()
                greeted_profile = ProfileGreetedByActiveUser.objects.create(profile=user.user.username, greeter= UserProfile.objects.get(user__username=request.user))
                greeted_profile.save()
                return HttpResponse(greetings)
    return HttpResponse(greetings)



def track_url(request):
    context = RequestContext(request)
    page_id = None
    url = '/social_reach/'

    if request.method == 'GET':
        if 'page_id' in request.GET:
            page_id = request.GET['page_id']
            try:
                page = Page.objects.get(id = page_id)
                page.views = page.views + 1
                page.save()
                url = page.url
            except:
                pass

    return redirect(url)



def show_category(request, category_name_url):
	_context = {}

        cat_list = get_category_list()

	try:
		category = Category.objects.get(slug=category_name_url)

		pages = Page.objects.filter(category=category).order_by('-views')
		_context['category'] = category
		_context['pages'] = pages
	except Category.DoesNotExist:
		_context['category'] = None
		_context['pages'] = None
        _context['cat_list'] = cat_list


	return render(request, 'reach/category.html', context=_context)

def get_category_list():
    cat_list = Category.objects.all().order_by('-views')
    for cat in cat_list:
        cat.url = cat.slug

        return cat_list


@login_required
def profile(request):
    context = RequestContext(request)
    cat_list = get_category_list()
    context_dict = {'cat_list': cat_list}
    u = User.objects.get(username=request.user)

    try:
        up = UserProfile.objects.get(user=u)
    except:
        up = None

    context_dict['user'] = u
    context_dict['userprofile'] = up

    return render(request, 'reach/profile.html', context_dict)



def index(request):

	user_list = UserProfile.objects.all().exclude(user__username=request.user)
	pages_list = Page.objects.order_by('-views')[:5]
        print(user_list[1].user.username)
        cat_list = get_category_list()
	_context = {
		'users': user_list,
		'most_viewed_pages': pages_list,
		'title' : 'Welcome to Tango with Django',
        'cat_list': cat_list
	}

	response = render(request, 'reach/index.html', context=_context)

        visits = int(request.COOKIES.get('visits', '0'))

        if request.session.get('last_visit'):
# Yes it does! Get the cookie's value.
            last_visit_time = request.session.get('last_visit')
            print(last_visit_time)
            visits = request.session.get('visits', 0)
# If it's been more than a day since the last visit...
            if  (datetime.now() - datetime.strptime(last_visit_time[:-7], "%Y-%m-%d %H:%M:%S")).days > 0:
# ...reassign the value of the cookie to +1 of what it was before...
                request.session['visits'] = visits + 1
                request.session['last_visit'] = str(datetime.now())
        else:
# Cookie last_visit doesn't exist, so create it to the current date/time.
            request.session['last_visit'] = str(datetime.now())
            request.session['visits'] = 1
# Return response back to the user, updating any cookies that need changed.

	return render(request, 'reach/index.html', _context)


def matches(request):

    cat_list = get_category_list()

    if request.session.get('visits'):
        count = request.session.get('visits')
        print(count)
    else:
        count = 0

    matches_you_liked_first = Match.objects.filter(first_user__user__username=request.user)

    return render(request, 'reach/matches.html', 	{'visits': count, 'cat_list': cat_list, 'matches_you_first': matches_you_liked_first, 'matches_them_first': Match.objects.filter(second_user__user__username=request.user)
}
)


def register(request):
	cat_list = get_category_list()
	registered = False

	if request.method == 'POST':
		user_form = UserForm(data = request.POST)
		profile_form = UserProfileForm(data = request.POST)

		if user_form.is_valid() and profile_form.is_valid():
			user = user_form.save()
			user.set_password(user.password)
			user.save()

			profile = profile_form.save(commit = False)
			profile.user = user

			if 'picture' in request.FILES:
				profile.picture = request.FILES['picture']

			instagram_scraper =  InstagramScraper()
			insta_results = instagram_scraper.scrape_instagram_followers(profile.instagram_handle)
			profile.instagram_followers=profile.instagram_followers + insta_results
			profile.save()

			twitter_scraper = TwitterScraper()
			twitter_results = twitter_scraper.scrape_twitter_followers(profile.twitter_handle)
			print("Handle:",profile.twitter_handle)
			profile.twitter_followers = profile.twitter_followers + twitter_results
			profile.save()
			print("YOUTUBE HANDLE", profile.youtube_handle)
			youtube_scraper = YoutubeScraper()
			youtube_results = youtube_scraper.scrape_youtube_followers(profile.youtube_handle)
			print("YOUTUBE RESULT", youtube_results)
			profile.youtube_followers = profile.youtube_followers + youtube_results
			profile.save()
			print("HANDLES", profile.instagram_handle, profile.twitter_handle, profile.youtube_handle)


			registered = True
		else:
			print user_form.errors
			print profile_form.errors
	else:
		user_form = UserForm()
		profile_form = UserProfileForm()

	return render(request, 'reach/register.html', {
			'user_form': user_form,
			'profile_form': profile_form,
			'registered': registered,
			'cat_list': cat_list
		})


def user_login(request):
	cat_list = get_category_list()
	if request.method == 'POST':
		username = request.POST.get('username')
		password = request.POST.get('password')

		user = authenticate(username=username, password=password)

		if user:
			if user.is_active:
				login(request, user)
				return HttpResponseRedirect(reverse('social_reach:index'))
			else:
				return HttpResponse("Your account has been disabled. Please contact the admin.")
		else:
			return HttpResponse("Invalid username/password.")
	else:
		return render(request, 'reach/login.html', {'cat_list': cat_list})


@login_required
def user_logout(request):
	logout(request)
	return HttpResponseRedirect(reverse('social_reach:index'))


@login_required
def restricted(request):
        cat_list = get_category_list()
	return render(request, 'reach/restricted.html', {'cat_list': cat_list})
