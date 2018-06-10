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
                  # main pages
                  path('', views.mainPage, name="home"),
                  path('new/', views.mainPage, name="new"),
                  path('popular/', views.popularPage, name="popular"),
                  path('top_rated/', views.topRatedPage, name="top_rated"),
                  path('controversial/', views.controversialPage, name="controversial"),
                  # search
                  re_path(r'^search$', views.search, name="search"),
                  re_path(r'^search/topic$', views.search_topic, name="search_topic"),
                  re_path(r'^search/post$', views.search_post, name="search_post"),
                  re_path(r'^search/user$', views.search_user, name="search_user"),
                  # user
                  path('user/<str:username>/', views.user_page, name="user"),
                  path('user/<str:username>/add', views.add_friend, name="user_add_friend"),
                  path('user/<str:username>/remove', views.remove_friend, name="user_remove_friend"),
                  path('user/<str:username>/friends', views.profile_friends, name="user_friends"),
                  path('user/<str:username>/edit/', views.user_edit, name="user_edit"),
                  path('user/<str:username>/change_password/', views.user_change_password, name="user_change_password"),
                  path('user/<str:username>/privacy/', views.user_privacy, name="user_privacy"),
                  # user topics
                  path('user/<str:username>/topics/', views.user_topic_subscriptions, name="user_topics_subscriptions"),
                  path('user/<str:username>/topics/created', views.user_topic_created, name="user_topics_created"),
                  # user posts
                  path('user/<str:username>/posts/', views.user_posts, name="user_posts"),
                  path('user/<str:username>/posts/saved', views.user_posts_saved, name="user_posts_saved"),
                  path('user/<str:username>/posts/hidden', views.user_posts_hidden, name="user_posts_hidden"),
                  path('user/<str:username>/posts/upvoted', views.user_posts_upvoted, name="user_posts_upvoted"),
                  path('user/<str:username>/posts/downvoted', views.user_posts_downvoted, name="user_posts_downvoted"),
                  # user comments
                  path('user/<str:username>/comments/', views.user_comments, name="user_comments"),
                  path('user/<str:username>/comments/upvoted', views.user_comments_upvoted,
                       name="user_comments_upvoted"),
                  path('user/<str:username>/comments/downvoted', views.user_comments_downvoted,
                       name="user_comments_downvoted"),
                  # user authentication
                  path('login/', views.login, name="login"),
                  path('signup/', views.signup, name="signup"),
                  path('logout', auth_views.LogoutView.as_view(next_page='/'), name="logout"),
                  # topic related url's
                  path('topic/<str:topicName>/', views.topicPage, name="topic"),
                  path('topic/<str:topicName>/create_post/', views.createPost, name="create_post"),
                  path('topic/<str:topicName>/remove_post/', views.removePost, name="remove_post"),
                  path('topic/<str:topicName>/remove_post_confirm/', views.removePost_confirm, name="remove_post_confirm"),
                  path('topic_create/', views.createTopic, name="topic_create"),
                  path('topic/<str:topicName>/new', views.topic_new, name="topic_new"),
                  path('topic/<str:topicName>/popular', views.topic_popular, name="topic_popular"),
                  path('topic/<str:topicName>/top_rated', views.topic_top_rated, name="topic_top_rated"),
                  path('topic/<str:topicName>/report_post_list', views.post_report_list, name="report_post_list"),
                  # post related url's
                  path('topic/<str:topicName>/post/<int:postID>/', views.postPage, name="post"),
                  path('post/<int:postID>/save', views.post_save, name="post_save"),
                  path('post/<int:postID>/unsave', views.post_unsave, name="post_unsave"),
                  path('post/<int:postID>/hide', views.post_hide, name="post_hide"),
                  path('post/<int:postID>/show', views.post_show, name="post_show"),
                  path('post/<int:postID>/report', views.post_report, name="post_report"),
                  path('post/<int:postID>/report_post_confirmation', views.report_post_confirmation, name="report_post_confirmation"),
                  # comment up/down vote
                  path('vote_comment/', views.vote_comment, name="vote_comment"),
                  # post vote
                  path('vote_post/', views.vote_post, name="vote_post"),
                  # handle reports
                  path('handle_report/', views.handle_report, name="handle_report"),
                  # provavelmente não vai dar tempo
                  path('notifications/', views.notifications, name="notifications"),



                  # >>>>  REST FRAMEWORK  <<<<

                  # GET ALL
                  path('ws/topics', views.rest_all_topics),
                  path('ws/profiles', views.rest_all_profiles),
                  path('ws/posts', views.rest_all_posts),
                  path('ws/comments', views.rest_all_comments),
                  path('ws/reports', views.rest_all_reports),
                  path('ws/friends', views.rest_all_friends),

                  # GET SOME

                  # user topics
                  path('ws/user/<str:username>/topics/', views.rest_user_topic_subscriptions),
                  path('ws/user/<str:username>/topics/created', views.rest_user_topic_created),

                  # user posts
                  path('ws/user/<str:username>/posts/', views.rest_user_posts),
                  path('ws/user/<str:username>/posts/saved', views.rest_user_posts_saved),
                  path('ws/user/<str:username>/posts/hidden', views.rest_user_posts_hidden),
                  path('ws/user/<str:username>/posts/upvoted', views.rest_user_posts_upvoted),
                  path('ws/user/<str:username>/posts/downvoted', views.rest_user_posts_downvoted),

                  # user comments
                  path('ws/user/<str:username>/comments/', views.rest_user_comments),
                  path('ws/user/<str:username>/comments/upvoted', views.rest_user_comments_upvoted),
                  path('ws/user/<str:username>/comments/downvoted', views.rest_user_comments_downvoted),

                  # user friends
                  path('ws/user/<str:username>/friends', views.rest_user_friends),

                  path('ws/topic_posts', views.rest_topic_posts),
                  path('ws/post_comments', views.rest_post_comments),

                  # search
                  path('ws/search/topic', views.rest_search_topics),
                  path('ws/search/post', views.rest_search_posts),
                  path('ws/search/user', views.rest_search_users),

                  # GET ONE
                  path('ws/topic/<str:topic_name>/', views.rest_topic),
                  path('ws/post/<str:post_id>/', views.rest_post),
                  path('ws/profile/<str:username>/', views.rest_profile),
                  path('ws/comment/<str:comment_id>/', views.rest_comment),
                  path('ws/report/<str:report_id>/', views.rest_report),

                  # CREATE
                  path('ws/create_topic/', views.create_topic),
                  path('ws/create_post/', views.create_post),
                  path('ws/profile/create', views.rest_profile_create),
                  # EDIT
                  path('ws/profile/update/privacy', views.rest_profile_privacy_update),
                  path('ws/profile/update', views.rest_profile_update),

                  # AUTH
                  path('ws/login/', views.rest_login),

                  # POST OPERATIONS
                  path('ws/post/<str:post_id>/save', views.rest_post_save),
                  path('ws/post/<str:post_id>/unsave', views.rest_post_unsave),
                  path('ws/post/<str:post_id>/hide', views.rest_post_hide),
                  path('ws/post/<str:post_id>/unhide', views.rest_post_unhide),

                  # USER OPERATIONS
                  path('ws/user/<str:username>/add_friend', views.rest_user_add_friend),
                  path('ws/user/<str:username>/remove_friend', views.rest_user_remove_friend),
                  path('ws/user/<str:username>/change_password/', views.user_change_password, name="user_change_password"),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
