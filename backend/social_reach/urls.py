from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from django.views import generic
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from djoser import views as djoserviews

from django.views.generic import TemplateView
from django.views.generic import RedirectView
import re
from allauth.account.views import confirm_email as allauthemailconfirmation
from django.conf.urls import include
from social_reach import views
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

router = DefaultRouter()
router.register('users', djoserviews.UserViewSet)
from social_reach.views import CurrentUserDetail, LikeDetail, MatchDetail, ListCategoryView, ListProfileView, UserList, UserDetail, ProfileDetail, ListMatchView, ListLikesView


app_name = 'social_reach'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'matches/$', views.matches, name='matches'),
    url(r'register/$', views.register, name='register'),
    # url(r'login/$', views.user_login, name='login'),
    url(r'logout/$', views.user_logout, name='logout'),
    url(r'restricted/$', views.restricted, name='restricted'),
    url(r'add_category/$', views.add_category, name='add_category'),
    url(r'category/(?P<category_slug_url>[\w\-]+)/add-page/$', views.add_page, name='add_page'),
    url(r'category/(?P<category_name_url>[\w\-]+)/$', views.show_category, name='show_category'),
    url(r'user/(?P<username>[\w\-]+)/$', views.show_user, name='show_user'),
    url(r'^profile/$', views.profile, name='profile'),
    url(r'^goto/$', views.track_url, name='track_url'),
    url(r'^like_user/$', views.like_user, name='like_user'),
    url(r'^greet_user/$', views.greet_user, name='greet_user'),
    # REST API ROUTES UNDERNEATH THIS
    url(r'^categories/$', ListCategoryView.as_view(), name="categories_all"),
    url(r'^profiles/$', ListProfileView.as_view(), name="profiles"),
    url(r'^profiles/(?P<pk>\d+)/$', ProfileDetail.as_view(), name='profile_detail'),

    # Find profile within for search parameters e.g. age, distance etc
    url(r'^profiles/(?P<username>[\w\-]+)/minage=(?P<min_age>\d+)/maxage=(?P<max_age>\d+)/maxdistance=(?P<max_distance>\d+)/$', views.ProfilesWhichMeetSearchCriteria.as_view(), name='profiles_which_meet_search_criteria'),

    url(r'^profiles/(?P<username>[\w\-]+)/$', views.ProfileByUsername.as_view(), name='profile_username'),
    url(r'^users/$', UserList.as_view(), name='user-list'),
    url(r'^users/(?P<pk>\d+)/$', views.get_user_password, name='user_detail'),
    url(r'^users/(?P<username>[\w\-]+)/$', CurrentUserDetail.as_view(), name='current_user_detail'),
    url(r'^users/find/(?P<username>[\w\-]+)/$', views.SpecificUserDetail.as_view(), name='specific_user_detail'),
    # For sending link to reset password
    url(r'^users/reset_password/(?P<username>[\w\-]+)/$', views.UserPasswordResetEmail.as_view(), name='specific_user_detail'),
    # For making post request to actually reset password
    url(r'^users/reset_password/(?P<uidb64>[\w\-]+)/(?P<token>[\w\-]+)/$', views.UserPasswordReset.as_view(), name='user_password_reset'),
    url(r'^mutual_likes/$', ListMatchView.as_view(), name="mutual_likes"),
    url(r'^mutual_likes/(?P<pk>[\w\-]+)/$', MatchDetail.as_view(), name="mutual_like_detail"),
    url(r'^likes/$', ListLikesView.as_view(), name="likes"),
    url(r'^likes/(?P<pk>[\w\-]+)/$', LikeDetail.as_view(), name='like_detail'),
    url(
        r'^users/create/?$',
        djoserviews.UserCreateView.as_view(),
        name='user-create'
    ),
    url(r'^auth/users/confirmation/(?P<uidb64>[\w\-]+)/(?P<token>[\w\-]+)/$', views.user_confirm, name='user_confirm'),
    url(r'^auth/users/getreset/(?P<uidb64>[\w\-]+)/(?P<token>[\w\-]+)/$', views.user_reset, name='user_reset'),
    # url(r'^auth/users/confirmation/$', ActivationView.as_view(), name='user_confirmation'),
    # url(r'^auth/users/activate/(?P<username>[\w\-]+)/(?P<token>[\w\-]+)/$', ActivationView.as_view(), name='user_confirm'),
    url(
        r'^token/create/?$',
        djoserviews.TokenCreateView.as_view(),
        name='token-create'
    ),
    url(
        r'^token/destroy/?$',
        djoserviews.TokenDestroyView.as_view(),
        name='token-destroy'
    ),
     url(r'^jwt_login/', views.obtain_jwt_token),
        url(r'^auth-jwt-refresh/', views.refresh_jwt_token),
        url(r'^auth-jwt-verify/', views.verify_jwt_token),
    url(r'^auth/', include('djoser.urls')),
        url(r'^$', generic.RedirectView.as_view(
             url='/api/', permanent=False)),
        url(r'^api/$', get_schema_view()),
    url(r'^api/auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),
    #     url(r'^rest-auth/registration/account-email-verification-sent/', views.null_view, name='account_email_verification_sent'),
    # url(r'^rest-auth/registration/account-confirm-email/', views.null_view, name='account_confirm_email'),
    # url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.null_view, name='password_reset_confirm'),
    # url(r'^rest-auth/registration/', include('rest_auth.registration.urls'), name='account_signup'),
    #
    # url(r'^rest-auth/', include('rest_auth.urls')),
    # url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', TemplateView.as_view(),  name='password_reset_confirm'),
    #
    # url(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', allauthemailconfirmation,
    # name="account_confirm_email"),

      # url(r'^registration/verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    #       url(r'^rest-auth/registration/account-email-verification-sent/', views.django_rest_auth_null, name='account_email_verification_sent'),
    # url(r'^rest-auth/registration/account_confirm_email/$', views.django_rest_auth_null, name='account_confirm_email'),
    # url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.django_rest_auth_null, name='password_reset_confirm'),
    #      url(r'^rest-auth/registration/$', include('rest_auth.registration.urls')),
    #      url(r'^rest-auth/', include('rest_auth.urls')),

    # url(r'^rest-auth/registration/account-email-verification-sent/$', django_rest_auth_null, name='account_email_verification_sent'),
    # # path('password-reset/confirm/<str:uidb64>)/<str:token>/', django_rest_auth_null, name='password_reset_confirm')
    # url(r'^rest-auth/registration/account_confirm_email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),

    # url(r'^rest-auth/registration/account_confirm_email/',
    #     UserDetail.as_view(), name="account_confirm_email"),
    # url(r'^confirm-email/(?P<key>[-:\w]+)/$', confirm_email = ConfirmEmailView.as_view(),
    #     name="account_confirm_email"),

    ]
