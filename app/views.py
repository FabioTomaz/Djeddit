from django.shortcuts import render

# Create your views here.
from app.models import Topic, Post, User, Comment, UserSubscriptions


def mainPage(request):
    tparams = {
        "posts" : Post.objects.order_by("date"),

    }
    return render (request, "home.html", tparams)
