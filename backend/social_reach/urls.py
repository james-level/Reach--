from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from django.views import generic
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf.urls import include
from social_reach import views
from social_reach.views import ListCategoryView, ListProfileView, UserList, UserDetail, ListMatchView, ListLikesView

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
     url(r'^users/$', UserList.as_view(), name='user-list'),
    url(r'^users/(?P<pk>[\w\-]+)/$', UserDetail.as_view(), name='user_detail'),
    url(r'^mutual_likes/$', ListMatchView.as_view(), name="mutual_likes"),
    url(r'^likes/$', ListLikesView.as_view(), name="likes"),
    url(r'^$', generic.RedirectView.as_view(
         url='/api/', permanent=False)),
    url(r'^api/$', get_schema_view()),
    url(r'^api/auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),
    ]
