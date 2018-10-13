# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer, ProfileSerializer, UserSerializer, MatchSerializer, LikeSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.mail import send_mail
from social import settings as ReachSettings
from access_tokens import tokens

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

from social_reach.instagram_scraper import InstagramScraper
from social_reach.twitter_scraper import TwitterScraper
from social_reach.youtube_scraper import YoutubeScraper
from access_tokens import facebook_app_token , facebook_access_token

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

# @api_view()
# def null_view(request):
#     return Response(status=status.HTTP_400_BAD_REQUEST)

# class CustomActivationView(RegistrationView):
#     """
#     Override the Djoser view to provide an html template for activation email.
#     """
# #
#     def get_send_email_extras(self):
#
#         extras = super(CustomActivationView, self).get_send_email_extras()
#         extras['html_body_template_name'] = 'confirmations_email.html'
#         return extras
#
#     def get_context_data(self):
#         token = utils.login_user(self.request, serializer.user)
#         token_serializer_class = settings.SERIALIZERS.token
#         context = super(CustomRegistrationView, self).get_context_data()
#         context['token'] = utils.login_user(self.request, serializer.user)
#         context['user'] = context.get('user')
#         return context

    # def _action(self, serializer):
    #     token = utils.login_user(self.request, serializer.user)
    #     token_serializer_class = settings.SERIALIZERS.token
    #     return Response(
    #         data=token_serializer_class(token).data,
    #         status=status.HTTP_200_OK,
    #     )

# @api_view


def user_confirm(request, username):

    queryset = User.objects.all()
    for user in queryset:
        print("ACTIVE?", user.username, user.is_active)
    # make sure to catch 404's below
    user_to_confirm = queryset.get(username=username)

    token = tokens.generate(scope=(), key="some value", salt="None")
    message = render_to_string('confirm_account.html',{'token': token})
    msg = EmailMessage('Reach account confirmation',
    'Here is the message.',
    ReachSettings.EMAIL_HOST_USER,
    [user_to_confirm.get_email_field_name()],
    headers=Headers
    )
    msg.content_subtype = "html"
    msg.send()
    return HttpResponse("User account for " + user_to_confirm.username + " activated.")


# def user_confirm(request, username):
#     # context = RequestContext(request)
#     queryset = User.objects.all()
#     for user in queryset:
#         print("ACTIVE?", user.username, user.is_active)
#     # make sure to catch 404's below
#     user_to_confirm = queryset.get(username=username)
#
#     to = [ReachSettings.EMAIL_HOST_USER, user_to_confirm.get_email_field_name()]
#     if not user_to_confirm.is_active:
#         if settings.SEND_CONFIRMATION_EMAIL:
#             send_mail(
#         'Reach account confirmation',
#         'Hello again, ' + user_to_confirm.username + ". This email was sent on behalf of the Reach team to let you know that your account is now activated and ready to use. Head on over to the app to start chatting to the hottest influencers.",
#         ReachSettings.EMAIL_HOST_USER,
#         to,
#         fail_silently=False,
#     )
#
#         user_to_confirm.is_active = True
#         context = {'user': user_to_confirm}
#         user_to_confirm.save()
#         # settings.EMAIL.confirmation(request, context).send(to)
#     return HttpResponse("User account for " + user_to_confirm.username + " activated.")


class UserCreateView(generics.CreateAPIView):
    """
    Use this endpoint to register new user.
    """
    serializer_class = settings.SERIALIZERS.user_create
    permission_classes = [permissions.AllowAny]
    print("USER default")


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



# class UserViewSet(ModelViewSet):
#     """
#     A simple ViewSet for viewing and editing accounts.
#     """
#     queryset = get_user_model().objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [IsAdminUser]

# class VerifyEmailView(APIView):
#     permission_classes = (AllowAny,)
#     allowed_methods = ('POST', 'OPTIONS', 'HEAD')
#
#     def get_serializer(self, *args, **kwargs):
#         return VerifyEmailSerializer(*args, **kwargs)
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.kwargs['key'] = serializer.validated_data['key']
#         try:
#             confirmation = self.get_object()
#             confirmation.confirm(self.request)
#             return Response({'detail': _('Successfully confirmed email.')}, status=status.HTTP_200_OK)
#         except EmailConfirmation.DoesNotExist:
#             return Response({'detail': _('Error. Incorrect key.')}, status=status.HTTP_404_NOT_FOUND)
#
#     def get_object(self, queryset=None):
#         key = self.kwargs['key']
#         emailconfirmation = EmailConfirmationHMAC.from_key(key)
#         if not emailconfirmation:
#             if queryset is None:
#                 queryset = self.get_queryset()
#             try:
#                 emailconfirmation = queryset.get(key=key.lower())
#             except EmailConfirmation.DoesNotExist:
#                 raise EmailConfirmation.DoesNotExist
#         return emailconfirmation
#
#     def get_queryset(self):
#         qs = EmailConfirmation.objects.all_valid()
#         qs = qs.select_related("email_address__user")
#         return qs

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
    serializer_class = ProfileSerializer

    def get_queryset(self):
        # from IPython import embed; embed();
        return UserProfile.objects.all()

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

    def get_queryset(self):
        # from IPython import embed; embed();
        return User.objects.all()

class CurrentUserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
    # make sure to catch 404's below
        obj = queryset.get(username=self.request.user)
        return obj


class CurrentUserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
    # make sure to catch 404's below
        obj = queryset.get(username=self.request.user)
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

class RangoRegistrationView(RegistrationView):
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
	return render(request, 'rango/add_page.html', context=_context)


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


	return render(request, 'rango/add_category.html', {'form':form, 'cat_list': cat_list})


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
    return render(request, 'rango/user_profile.html', context=context)



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


	return render(request, 'rango/category.html', context=_context)

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

    return render(request, 'rango/profile.html', context_dict)



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

	response = render(request, 'rango/index.html', context=_context)

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

	return render(request, 'rango/index.html', _context)


def matches(request):

    cat_list = get_category_list()

    if request.session.get('visits'):
        count = request.session.get('visits')
        print(count)
    else:
        count = 0

    matches_you_liked_first = Match.objects.filter(first_user__user__username=request.user)

    return render(request, 'rango/matches.html', 	{'visits': count, 'cat_list': cat_list, 'matches_you_first': matches_you_liked_first, 'matches_them_first': Match.objects.filter(second_user__user__username=request.user)
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

	return render(request, 'rango/register.html', {
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
		return render(request, 'rango/login.html', {'cat_list': cat_list})


@login_required
def user_logout(request):
	logout(request)
	return HttpResponseRedirect(reverse('social_reach:index'))


@login_required
def restricted(request):
        cat_list = get_category_list()
	return render(request, 'rango/restricted.html', {'cat_list': cat_list})
