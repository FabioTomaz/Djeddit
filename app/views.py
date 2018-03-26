from django.http import HttpRequest, HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from django.urls import reverse

from app.forms import GeneralSearch
from app.models import Topic, Post, User, Comment, UserSubscriptions
import urllib.parse


def mainPage(request):
    tparams = {
        "posts": Post.objects.order_by("date"),
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
        }
        return render(request, "topic.html", tparams)


def search(request):
    searchstring = request.GET["q"]
    tparams = {
        'searchstring': searchstring,
        'topicresults': Topic.objects.filter(name__icontains=searchstring),
        'postresults': Post.objects.filter(title__icontains=searchstring),
        'userresults': User.objects.filter(userName__icontains=searchstring)
    }
    return render(request, "search.html", tparams)


def navbarSearch(request):
    return custom_redirect('search', q=request.POST["searchQuery"])


def custom_redirect(url_name, *args, **kwargs):
    url = reverse(url_name, args=args)
    params = urllib.parse.urlencode(kwargs)
    return HttpResponseRedirect(url + "?%s" % params)