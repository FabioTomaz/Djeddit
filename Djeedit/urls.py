"""Djeedit URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.contrib.auth import views as auth_views
import django.contrib.auth.urls
from app import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.mainPage, name="home"),
    re_path(r'^search$', views.search, name="search"),
    # user
    path('user/<str:username>/', views.user_page, name="user"),
    path('user/<str:username>/settings/', views.user_page, name="user_settings"),
    # user topics
    path('user/<str:username>/topics/', views.user_page, name="user_topics_subscriptions"),
    path('user/<str:username>/topics/created', views.user_page, name="user_topics_created"),
    # user posts
    path('user/<str:username>/posts/', views.user_page, name="user_posts"),
    path('user/<str:username>/posts/upvoted', views.user_page, name="user_posts_upvoted"),
    path('user/<str:username>/posts/downvoted', views.user_page, name="user_posts_downvoted"),
    # user comments
    path('user/<str:username>/comments/', views.user_page, name="user_comments"),
    path('user/<str:username>/comments/upvoted', views.user_page, name="user_comments_upvoted"),
    path('user/<str:username>/comments/downvoted', views.user_page, name="user_comments_downvoted"),
    # user authentication
    path('login/', views.login, name="login"),
    path('signup/', views.signup, name="signup"),
    path('logout', auth_views.LogoutView.as_view(next_page='/'), name="logout"),
    # topic related url's
    path('topic/<str:topicName>/', views.topicPage, name="topic"),
    path('topic/<str:topicName>/create_post/', views.createPost, name="create_post"),
    path('topic_create/', views.createTopic, name="topic_create"),
    # post related url's
    path('topic/<str:topicName>/post/<int:postID>/', views.postPage, name="post"),
    # provavelmente não vai dar tempo
    path('notifications/', views.notifications, name="notifications"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
