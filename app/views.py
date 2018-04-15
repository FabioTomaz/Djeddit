import json
from django.contrib.auth import authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Count, Sum, F
from django.http import HttpRequest, HttpResponseRedirect, HttpResponse, Http404
from django.http import HttpRequest, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.contrib.auth import login as auth_login
from django.views.decorators.csrf import csrf_exempt

from Djeedit.config import pagination
from app.forms import SignUpForm, UserForm, ProfileForm

from app.forms import topicCreateForm, CommentOnPost, CreatePost
from app.models import Topic, Post, User, Comment, Profile, Friend
import urllib.parse
from datetime import datetime


def mainPage(request):
    posts = Post.objects.order_by("-date")

    pages = pagination(request, posts, num=10)

    tparams = {
        'items': pages[0],
        'page_range': pages[1],
        'year': datetime.now().year,
        "nbar": "New"
    }
    return render(request, "home.html", tparams)


def popularPage(request):
    posts = Post.objects.order_by("-clicks")

    pages = pagination(request, posts, num=10)

    tparams = {
        'items': pages[0],
        'page_range': pages[1],
        'year': datetime.now().year,
        "nbar": "Popular"
    }
    return render(request, "home.html", tparams)


def topRatedPage(request):
    posts = Post.objects.annotate(numUp=Count("userUpVotesPost"))\
        .annotate(numDown=Count("userDownVotesPost"))\
        .annotate(score=F("numUp") - F("numDown"))\
        .order_by("-score")

    pages = pagination(request, posts, num=10)

    tparams = {
        'items': pages[0],
        'page_range': pages[1],
        'year': datetime.now().year,
        "nbar": "Top Rated"
    }
    return render(request, "home.html", tparams)


def controversialPage(request):
    posts = Post.objects.annotate(numUp=Count("userUpVotesPost"))\
            .annotate(numDown=Count("userDownVotesPost"))\
            .annotate(score=F("numUp") - F("numDown"))\
            .annotate(numVotes=F("numUp") + F("numDown"))\
            .filter(numVotes__gte=10)\
            .filter(score__lte=3)\
            .filter(score__gte=-3)

    pages = pagination(request, posts, num=10)

    tparams = {
        'items': pages[0],
        'page_range': pages[1],
        'year': datetime.now().year,
        "nbar": "Controversial"
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


def search_post(request):
    searchstring = request.GET.get("q", " ")
    tparams = {
        'searchbar': 'search_post',
        'year': datetime.now().year,
        "results": Post.objects.filter(title__icontains=searchstring)
    }
    return render(request, "search_posts.html", tparams)


def search_topic(request):
    searchstring = request.GET.get("q", " ")
    tparams = {
        'searchbar': 'search_topic',
        'year': datetime.now().year,
        "results": Topic.objects.filter(name__icontains=searchstring)
    }
    return render(request, "search_topics.html", tparams)


def search_user(request):
    searchstring = request.GET.get("q", "")
    tparams = {
        'searchbar': 'search_user',
        'year': datetime.now().year,
        "results": Profile.objects.filter(user__username__icontains=searchstring)
    }
    return render(request, "search_users.html", tparams)


def notifications(request):
    return render(request, 'notifications.html')


def signup(request):
    dict = {}
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
    tparams = {}
    try:
        if request.user.is_authenticated:
            friend_object, created = Friend.objects.get_or_create(current_user=request.user.profile)
            friends = [friend for friend in friend_object.users.all() if friend != request.user.profile]
            if User.objects.get(username=username).profile in friends:
                tparams["friends"] = True
            else:
                tparams["friends"] = False
        up_posts_count = Post.objects.filter(userOP=User.objects.get(username=username)) \
            .annotate(countUp=Count("userUpVotesPost"))
        down_posts_count = Post.objects.filter(userOP=User.objects.get(username=username)) \
            .annotate(countDown=Count("userDownVotesPost"))
        score_posts = 0
        for i in up_posts_count:
            score_posts += i.countUp
        for i in down_posts_count:
            score_posts -= i.countDown
        up_comments_count = Comment.objects.filter(user=User.objects.get(username=username)) \
            .annotate(countUp=Count("userUpVotesComments"))
        down_comments_count = Comment.objects.filter(user=User.objects.get(username=username)) \
            .annotate(countDown=Count("userDownVotesComments"))
        score_comments = 0
        for i in up_comments_count:
            score_comments += i.countUp
        for i in down_comments_count:
            score_comments -= i.countDown
        tparams["karma_posts"] = score_posts
        tparams["karma_comments"] = score_comments
        tparams["sidebar"] = "user_page"
        tparams["profile_user"] = User.objects.get(username=username)
        return render(request, 'profile_page.html', tparams)
    except User.DoesNotExist:
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
        try:
            tparams = {
                "sidebar": "user_page",
                "profile_user": User.objects.get(username=username),
                'user_form': user_form,
                'profile_form': profile_form
            }
            return render(request, 'profile_edit.html', tparams)
        except User.DoesNotExist:
            tparams = {"user": username}
            return render(request, 'user_not_found.html', tparams)
    else:
        return redirect('/user/' + username)


def user_settings(request, username):
    tparams = {
        'sidebar': 'user_settings'
    }
    return render(request, 'profile.html', tparams)


def user_topic_subscriptions(request, username):
    try:
        tparams = {
            'sidebar': 'user_topic_subscriptions',
            "profile_user": User.objects.get(username=username),
            'topics': User.objects.get(username=username).profile.subscriptions.all
        }
        return render(request, 'profile_topics.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_topic_created(request, username):
    try:
        tparams = {
            'sidebar': 'user_topic_created',
            "profile_user": User.objects.get(username=username),
            'topics': Topic.objects.filter(userCreator=User.objects.get(username=username))
        }
        return render(request, 'profile_topics.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_posts(request, username):
    try:
        tparams = {
            'sidebar': 'user_posts',
            "profile_user": User.objects.get(username=username),
            'posts': Post.objects.filter(userOP=User.objects.get(username=username))
        }
        return render(request, 'profile_posts.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_posts_saved(request, username):
    try:
        tparams = {
            'sidebar': 'user_posts_saved',
            "profile_user": User.objects.get(username=username),
            'posts': Post.objects.filter(userSaved=Profile.objects.get(user__username=username))
        }
        return render(request, 'profile_posts.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_posts_hidden(request, username):
    try:
        tparams = {
            'sidebar': 'user_posts_hidden',
            "profile_user": User.objects.get(username=username),
            'posts': Post.objects.filter(userHidden=Profile.objects.get(user__username=username))
        }
        return render(request, 'profile_posts.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_posts_upvoted(request, username):
    try:
        tparams = {
            'sidebar': 'user_posts_upvoted',
            "profile_user": User.objects.get(username=username),
            'posts': Post.objects.filter(userUpVotesPost=Profile.objects.get(user__username=username))
        }
        return render(request, 'profile_posts.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_posts_downvoted(request, username):
    try:
        tparams = {
            'sidebar': 'user_posts_downvoted',
            "profile_user": User.objects.get(username=username),
            'posts': Post.objects.filter(userDownVotesPost=Profile.objects.get(user__username=username))
        }
        return render(request, 'profile_posts.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_comments(request, username):
    try:
        tparams = {
            'sidebar': 'user_comments',
            "profile_user": User.objects.get(username=username),
            'comments': Comment.objects.filter(user=Profile.objects.get(user__username=username))
        }
        return render(request, 'profile_comments.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_comments_upvoted(request, username):
    try:
        tparams = {
            'sidebar': 'user_comments',
            "profile_user": User.objects.get(username=username),
            'comments': Comment.objects.filter(userUpVotesComments=Profile.objects.get(user__username=username))
        }
        return render(request, 'profile_comments.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


def user_comments_downvoted(request, username):
    try:
        tparams = {
            'sidebar': 'user_comments',
            "profile_user": User.objects.get(username=username),
            'comments': Comment.objects.filter(userDownVotesComments=Profile.objects.get(user__username=username))
        }
        return render(request, 'profile_comments.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)


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
            'errors': errors,
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

            if Topic.objects.filter(name__iexact=topic).exists():  # topic with same name exists
                return render(request, 'topic_create.html', {'form': form, 'error': "A topic with this"
                                                                                    + " name already exists. Please, choose a different name"})
            t = Topic(name=topic, description=description, rules=rules, userCreator=request.user)
            t.save()
            return render(request, 'topic_created_success.html', {"topic": t})
    else:
        form = topicCreateForm()
    return render(request, 'topic_create.html', {'form': form})


def topicCreatedSuccess(request):
    return render(request, "topic_created_success.html")


def topicPage(request, topicName, postOrder="popular"):
    topic = Topic.objects.get(name__iexact=topicName)
    isUserSubscribed = False
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        if topic in profile.topics.all():
            isUserSubscribed = True
        if request.method == 'POST':
            if not isUserSubscribed:
                # add a subscription
                topic.nSubscribers += 1
                profile.topics.add(topic)  # add this topic to his list of subscribed topics
                profile.save()
                topic.save()
                isUserSubscribed = True  # user will now be subscribed
            else:
                # remove a subscription
                topic.nSubscribers -= 1
                profile.topics.remove(topic)
                profile.save()
                topic.save()
                isUserSubscribed = False
        tparams = {
            "isUserSubscribed": isUserSubscribed,
            "postOrder": postOrder,
            "currentTopic": Topic.objects.get(name__iexact=topicName),
            "posts": Post.objects.filter(topic__name__iexact=topicName).order_by("date"),
        }
        return render(request, "topic.html", tparams)
    else:
        if topic is None:
            return custom_redirect('search', q=topicName)
        else:
            if (postOrder == "new"):
                p = Post.objects.filter(topic__name__iexact=topicName).order_by("-date")
            elif (postOrder == "popular"):
                p = Post.objects.filter(topic__name__iexact=topicName).order_by("-date")
            else:
                p = Post.objects.filter(topic__name__iexact=topicName).order_by("-date")
            tparams = {
                "isUserSubscribed": isUserSubscribed,
                "postOrder": postOrder,
                "currentTopic": Topic.objects.get(name__iexact=topicName),
                "posts": p,
            }
            return render(request, "topic.html", tparams)


def topic_new(request, topicName):
    return topicPage(request, topicName, "new")


def topic_popular(request, topicName):
    return topicPage(request, topicName, "popular")


def topic_top_rated(request, topicName):
    return topicPage(request, topicName, "top_rated")


@csrf_exempt
def vote_comment(request):
    if request.is_ajax() and request.method == 'POST':
        data = json.loads(request.body)
        comment = Comment.objects.get(id=data["comment_id"])
        if data["vote"] == "up":
            if request.user.profile in comment.userUpVotesComments.all():
                comment.userUpVotesComments.remove(request.user.profile)
                request.user.profile.comment_user_up.remove(comment)
                request.user.profile.save()
                comment.save()
            else:
                comment.userUpVotesComments.add(request.user.profile)
                comment.save()
                # check if there is downvote, if so, delete it
                if request.user.profile in comment.userDownVotesComments.all():
                    comment.userDownVotesComments.remove(request.user.profile)
                    request.user.profile.comment_user_down.remove(comment)
                    request.user.profile.save()
                    comment.save()
        elif data["vote"] == "down":
            if request.user.profile in comment.userDownVotesComments.all():
                comment.userDownVotesComments.remove(request.user.profile)
                request.user.profile.comment_user_down.remove(comment)
                request.user.profile.save()
                comment.save()
            else:
                comment.userDownVotesComments.add(request.user.profile)
                comment.save()
                # check if there is upvote, if so, delete it
                if request.user.profile in comment.userUpVotesComments.all():
                    comment.userUpVotesComments.remove(request.user.profile)
                    request.user.profile.comment_user_up.remove(comment)
                    request.user.profile.save()
                    comment.save()
        result = 'success'
    else:
        raise Http404("Page not found :(")

    dict = {"result": result}
    return HttpResponse(json.dumps(dict), content_type="application/json")


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


@csrf_exempt
def post_save(request, postID):
    post = Post.objects.get(id=postID)
    # add a commentary to post
    if request.method == 'POST' and request.user.is_authenticated:
        post.userSaved.add(request.user.profile)
        post.save()
        dict = {'result': 'success'}
    else:
        dict = {'result': 'error'}
    return HttpResponse(json.dumps(dict), content_type="application/json")


@csrf_exempt
def post_unsave(request, postID):
    post = Post.objects.get(id=postID)
    # add a commentary to post
    if request.method == 'POST' and request.user.is_authenticated:
        post.userSaved.remove(request.user.profile)
        request.user.profile.user_post_saved.remove(post)
        request.user.profile.save()
        post.save()
        dict = {'result': 'success'}
    else:
        dict = {'result': 'error'}
    return HttpResponse(json.dumps(dict), content_type="application/json")


@csrf_exempt
def post_hide(request, postID):
    post = Post.objects.get(id=postID)
    # add a commentary to post
    if request.method == 'POST' and request.user.is_authenticated:
        post.userHidden.add(request.user.profile)
        post.save()
        dict = {'result': 'success'}
    else:
        dict = {'result': 'error'}
    return HttpResponse(json.dumps(dict), content_type="application/json")


@csrf_exempt
def post_show(request, postID):
    post = Post.objects.get(id=postID)
    # add a commentary to post
    if request.method == 'POST' and request.user.is_authenticated:
        post.userHidden.remove(request.user.profile)
        request.user.profile.user_post_hidden.remove(post)
        request.user.profile.save()
        post.save()
        dict = {'result': 'success'}
    else:
        dict = {'result': 'error'}
    return HttpResponse(json.dumps(dict), content_type="application/json")


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


@csrf_exempt
def profile_friends(request, username):
    if request.user.is_authenticated:
        friend_object, created = Friend.objects.get_or_create(current_user=request.user.profile)
        friends = [friend for friend in friend_object.users.all() if friend != request.user.profile]
    return render(request, 'profile_friends.html',
                  {"friends": friends, "profile_user": User.objects.get(username=username),
                   "sidebar": "profile_friends"})


@csrf_exempt
def add_friend(request, username):
    result = {}
    try:
        new_friend = User.objects.get(username=username).profile
        owner = request.user.profile

        Friend.make_friend(owner, new_friend)
        result['result'] = 'success'
    except:
        result['result'] = 'error'
    return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def remove_friend(request, username):
    result = {}
    try:
        new_friend = User.objects.get(username=username).profile
        owner = request.user.profile

        Friend.remove_friend(owner, new_friend)
        result['result'] = 'success'
    except:
        result['result'] = 'error'
    return HttpResponse(json.dumps(result), content_type="application/json")
