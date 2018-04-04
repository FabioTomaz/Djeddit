from datetime import datetime

from django.contrib.auth import authenticate
from django.contrib.auth.views import login
from django.http import HttpRequest, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

from app.forms import CustomLoginForm, CustomUserCreationForm
from app.models import Topic, Post, User, Comment, UserSubscriptions
import urllib.parse


def mainPage(request):
    tparams = {
        "posts": Post.objects.order_by("date"),
        'year': datetime.now().year,
    }
    return render(request, "home.html", tparams)


def topicPage(request, topicName):
    topic = Topic.objects.get(name=topicName.lower())
    if topic is None:
        return custom_redirect('search', q=topicName)
    else:
        tparams = {
            "currentTopic": Topic.objects.get(name=topicName.lower()),
            "posts": Post.objects.filter(topic__name=topicName.lower()).order_by("date"),
            'year': datetime.now().year,
        }
        return render(request, "topic.html", tparams)


def search(request):
    tparams = {
        'year': datetime.now().year
    }
    searchstring = request.GET.get("q", "")
    filtertype = request.GET.get("filterType", "")

    tparams["searchstring"] = searchstring
    if filtertype == 'searchTopicsOption':
        tparams["topicresults"] = Topic.objects.filter(name__icontains=searchstring)
    elif filtertype == 'searchPostsOption':
        tparams["postresults"] = Post.objects.filter(title__icontains=searchstring)
    elif filtertype == 'searchUsersOption':
        tparams["userresults"] = User.objects.filter(userName__icontains=searchstring)

    return render(request, "search.html", tparams)


def navbarSearch(request):
    return custom_redirect('search', q=request.POST["searchQuery"], filterType=request.POST["searchTypeFilter"])


def signup(request):
    next = request.POST.get('next', '/')
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')
        raw_password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=raw_password)
        login(request, user)
    return render(request, next)


def custom_redirect(url_name, *args, **kwargs):
    url = reverse(url_name, args=args)
    params = urllib.parse.urlencode(kwargs)
    return HttpResponseRedirect(url + "?%s" % params)
