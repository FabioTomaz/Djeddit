from datetime import datetime

import json
from django.contrib.auth import authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpRequest, HttpResponseRedirect, HttpResponse
from django.core.exceptions import ValidationError
from django.http import HttpRequest, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth import login as auth_login
from app.forms import SignUpForm, UserForm, ProfileForm

from app.forms import topicCreateForm, CommentOnPost, CreatePost
from app.models import Topic, Post, User, Comment, Profile
import urllib.parse
from datetime import datetime


def mainPage(request):
    tparams = {
        "posts": Post.objects.order_by("date"),
        'year': datetime.now().year,
        "nbar": "new"
    }
    return render(request, "home.html", tparams)


def popularPage(request):
    ordered = sorted(Post.objects.all(), key=lambda post: post.clicks, reverse=True)
    tparams = {
        "posts": ordered,
        'year': datetime.now().year,
        "nbar": "popular"
    }
    return render(request, "home.html", tparams)


def topRatedPage(request):
    ordered = sorted(Post.objects.all(), key=lambda post: post.clicks, reverse=True)
    tparams = {
        "posts": ordered,
        'year': datetime.now().year,
        "nbar": "top_rated"
    }
    return render(request, "home.html", tparams)


def controversialPage(request):
    tparams = {
        "posts": Post.objects.order_by("date"),
        'year': datetime.now().year,
        "nbar": "controversial"
    }
    return render(request, "home.html", tparams)


def search(request):
    tparams = {
        'year': datetime.now().year
    }
    searchstring = request.GET.get("q", " ")
    filtertype = request.GET.get("filterType", "searchPostsOption")

    if filtertype == 'searchTopicsOption':
        tparams["results"] = Topic.objects.filter(name__icontains=searchstring)
        template = "search_topics.html"
    elif filtertype == 'searchUsersOption':
        tparams["results"] = User.objects.filter(userName__icontains=searchstring)
        template = "search_users.html"
    else:
        tparams["results"] = Post.objects.filter(title__icontains=searchstring)
        template = "search_posts.html"
    return render(request, template, tparams)


def notifications(request):
    return render(request, 'notifications.html')


def signup(request):
    dict = {}
    next = request.POST.get('next', '/')
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()  # load the profile instance created by the signal
            user.profile.birth_date = form.cleaned_data.get('birth_date')
            user.save()
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            auth_login(request, user)
            return HttpResponse(json.dumps(dict), content_type="application/json")
    dict["errors"] = form.errors
    return HttpResponse(json.dumps(dict), content_type="application/json")


def custom_redirect(url_name, *args, **kwargs):
    url = reverse(url_name, args=args)
    params = urllib.parse.urlencode(kwargs)
    return HttpResponseRedirect(url + "?%s" % params)


def user_page(request, username):
    try:
        tparams = {
            "sidebar": "user_page",
            "url_username": username
        }
        return render(request, 'profile_page.html', tparams)
    except Profile.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_edit(request, username):
    if request.user.is_authenticated and request.user.username == username:
        if request.method == 'POST':
            user_form = UserForm(request.POST, instance=request.user)
            profile_form = ProfileForm(request.POST, request.FILES, instance=request.user.profile)
            if user_form.is_valid() and profile_form.is_valid():
                user_form.save()
                profile_form.save()
                return user_page(request, username)
        else:
            user_form = UserForm(instance=request.user)
            profile_form = ProfileForm(instance=request.user.profile)
        return render(request, 'profile_edit.html', {
            'user_form': user_form,
            'profile_form': profile_form
        })



    try:
        tparams = {
            "sidebar": "user_page",
            "profile": Profile.objects.get(user__username=username)
        }
        return render(request, 'profile_edit.html', tparams)
    except Profile.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_settings(request, username):
    tparams = {
        'sidebar': 'user_settings'
    }
    return render(request, 'profile.html', tparams)


def user_topic_subscriptions(request, username):
    tparams = {
        'sidebar': 'user_topic_subscriptions',
        'topics': Topic.objects.filter(profile__user__username=username)
    }
    return render(request, 'profile_topics.html', tparams)


def user_topic_created(request, username):
    tparams = {
        'sidebar': 'user_topic_created',
        'topics': Topic.objects.filter(userCreator=request.user)
    }
    return render(request, 'profile_topics.html', tparams)


def user_posts(request, username):
    tparams = {
        'sidebar': 'user_posts'
    }
    return render(request, 'profile.html', tparams)


def user_posts_upvoted(request, username):
    tparams = {
        'sidebar': 'user_posts_upvoted'
    }
    return render(request, 'profile.html', tparams)


def user_posts_downvoted(request, username):
    tparams = {
        'sidebar': 'user_posts_downvoted'
    }
    return render(request, 'profile.html', tparams)


def user_comments(request, username):
    tparams = {
        'sidebar': 'user_comments'
    }
    return render(request, 'profile.html', tparams)


def user_comments_upvoted(request, username):
    tparams = {
        'sidebar': 'user_comments_upvoted'
    }
    return render(request, 'profile.html', tparams)


def user_comments_downvoted(request, username):
    tparams = {
        'sidebar': 'user_comments_downvoted'
    }
    return render(request, 'profile.html', tparams)


def login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # Okay, security check complete. Log the user in.
            auth_login(request, form.get_user())
            errors = False
        else:
            errors = True
        dict = {
            'errors': errors
        }

        return HttpResponse(json.dumps(dict), content_type="application/json")


def createTopic(request):
    if request.method == 'POST':
        form = topicCreateForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # insert new topic on DB
            topic = form.cleaned_data["topicName"]
            description = form.cleaned_data["description"]
            rules = form.cleaned_data["rules"]

            if Topic.objects.filter(name=topic).exists():
                raise ValidationError("A topic with this name already exists. Please, choose a different name")
            t = Topic(name=topic, description=description, rules=rules, userCreator=request.user)
            t.save()
            return render(request, 'topic_created_success.html', {"topic": topic})
    else:
        form = topicCreateForm()
    return render(request, 'topic_create.html', {'form': form})


def topicCreatedSuccess(request):
    return render(request, "topic_created_success.html")


def topicPage(request, topicName):
    topic = Topic.objects.get(name__iexact=topicName)
    isUserSubscribed = False
    try:
        subscription = UserSubscriptions.objects.get(topic=topic, user=request.user)
    except UserSubscriptions.DoesNotExist:
        subscription = None
    if not subscription == None:
        isUserSubscribed = True
    if request.method == 'POST':
        if not isUserSubscribed:
            # add a subscription
            topic.nSubscribers += 1
            subs = UserSubscriptions(user=request.user, topic=topic)
            topic.save()
            subs.save()
            isUserSubscribed = True  # user will now be subcribed
        else:
            # remove a subscription
            topic.nSubscribers -= 1
            subscription.delete()
            topic.save()
            isUserSubscribed = False
        tparams = {
            "isUserSubscribed": isUserSubscribed,
            "currentTopic": Topic.objects.get(name__iexact=topicName),
            "posts": Post.objects.filter(topic__name__iexact=topicName).order_by("date"),
        }
        return render(request, "topic.html", tparams)
    else:
        if topic is None:
            return custom_redirect('search', q=topicName)
        else:
            tparams = {
                "isUserSubscribed": isUserSubscribed,
                "currentTopic": Topic.objects.get(name__iexact=topicName),
                "posts": Post.objects.filter(topic__name__iexact=topicName).order_by("date"),
            }
            return render(request, "topic.html", tparams)


def postPage(request, topicName, postID):
    post = Post.objects.get(id=postID)
    # add a commentary to post
    if request.method == 'POST':
        form = CommentOnPost(request.POST)
        if form.is_valid():
            # insert new comment on DB
            # if this is a reply, get the comment id from hidden input
            try:
                # id integer e.g. 15
                comment_id = int(request.POST.get('comment_id'))
            except:
                comment_id = None  # not a reply
            text = form.cleaned_data["comment"]
            # no point in checking if user is logged because the comment box only shows
            # if user is logged in
            # this comment was a reply
            if not comment_id == None:
                c = Comment(user=request.user, post=post, date=datetime.now(),
                            text=text, reply=Comment.objects.get(id=comment_id))
            # the comment is just a comment, not a reply
            else:
                c = Comment(user=request.user, post=post, date=datetime.now(),
                            text=text, reply=None)
                # increment the number of commentaries this post has
                post.nComments += 1
                post.save()
            c.save()
            form = CommentOnPost()  # clear fields
            text = ""
            return render(request, 'post.html', {"post": post,
                                                 "comments": Comment.objects.filter(post__id=postID),
                                                 "topicName": topicName, 'form': form})
    else:
        form = CommentOnPost()
    if post is None:
        return custom_redirect('search', q=post)
    else:
        comments = Comment.objects.filter(post__id=postID)
        tparams = {
            "post": post,
            "topicName": topicName,
            "comments": comments,
            'form': form
        }
    return render(request, "post.html", tparams)


def createPost(request, topicName):
    topic = Topic.objects.get(name=topicName)
    if request.method == 'POST':
        form = CreatePost(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # insert new post on DB
            title = form.cleaned_data["title"]
            content = form.cleaned_data["content"]
            post = Post(userOP=request.user, title=title, content=content, topic=topic)
            post.save()
            return render(request, "topic.html", {"currentTopic": Topic.objects.get(name__iexact=topicName),
                                                  "posts": Post.objects.filter(topic__name__iexact=topicName).order_by(
                                                      "date"), })
    else:
        form = CreatePost()
    return render(request, "create_post.html", {"form": form, "topicName": topic.name, "topic": topic})
