from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from django.views import generic
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.views.generic import TemplateView
from django.views.generic import RedirectView
import re
from allauth.account.views import confirm_email as allauthemailconfirmation
from django.conf.urls import include
from social_reach import views
from rest_framework import routers
from social_reach.views import CustomRegistrationView, CurrentUserDetail, LikeDetail, MatchDetail, ListCategoryView, ListProfileView, UserList, UserDetail, ProfileDetail, ListMatchView, ListLikesView, null_view

app_name = 'social_reach'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'matches/$', views.matches, name='matches'),
    url(r'register/$', views.register, name='register'),
    url(r'login/$', views.user_login, name='login'),
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
    url(r'^profiles/(?P<pk>[\w\-]+)/$', ProfileDetail.as_view(), name='profile_detail'),
    url(r'^users/$', UserList.as_view(), name='user-list'),
    url(r'^users/(?P<pk>\d+)/$', UserDetail.as_view(), name='user_detail'),
    url(r'^users/(?P<username>[\w\-]+)/$', CurrentUserDetail.as_view(), name='current_user_detail'),
    url(r'^mutual_likes/$', ListMatchView.as_view(), name="mutual_likes"),
    url(r'^mutual_likes/(?P<pk>[\w\-]+)/$', MatchDetail.as_view(), name="mutual_like_detail"),
    url(r'^likes/$', ListLikesView.as_view(), name="likes"),
    url(r'^likes/(?P<pk>[\w\-]+)/$', LikeDetail.as_view(), name='like_detail'),
    url(r'^$', generic.RedirectView.as_view(
         url='/api/', permanent=False)),
    url(r'^api/$', get_schema_view()),
    url(r'^auth/users/activate/$', CustomRegistrationView.as_view(), name='user_activate'),
    url(r'^auth/', include('djoser.urls')),
    # url(r'^api/auth/', include(
    #     'rest_framework.urls', namespace='rest_framework')),
    # url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    # url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),
    #     url(r'^rest-auth/registration/account-email-verification-sent/', views.null_view, name='account_email_verification_sent'),
    url(r'^rest-auth/registration/account-confirm-email/', views.null_view, name='account_confirm_email'),
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.null_view, name='password_reset_confirm'),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'), name='account_signup'),
    url(r'^rest-auth/', include('rest_auth.urls')),
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
