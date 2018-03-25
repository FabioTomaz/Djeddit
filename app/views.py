from django.http import HttpRequest
from django.shortcuts import render

# Create your views here.
from app.models import Topic, Post, User, Comment, UserSubscriptions
from datetime import datetime

def mainPage(request):
    tparams = {
        "posts" : Post.objects.order_by("date"),
    }
    return render(request, "home.html", tparams)

def topicPage(request, topicName):
    #topicName = request.GET.get('topicName', '')
    tparams = {
        "posts" : Post.objects.filter(topic__name=topicName),
    }
    return render (request, "topic.html", tparams)


def login(request):
    assert isinstance(request, HttpRequest)
    tparams = {
        'title': 'Login',
        'message': 'Login page.',
        'year': datetime.now().year,
    }
    return render(request, 'login.html', tparams)