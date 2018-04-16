import json
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.db.models import Count, F, Q
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
        tparams['searchbar'] = 'search_topic'
    elif filtertype == 'searchUsersOption':
        tparams["results"] = User.objects.filter(username__icontains=searchstring)
        template = "search_users.html"
        tparams['searchbar'] = 'search_user'
    else:
        tparams["results"] = Post.objects.filter(title__icontains=searchstring)
        tparams['searchbar'] = 'search_post'
        template = "search_posts.html"
    return render(request, template, tparams)


def search_post(request):
    searchstring = request.GET.get("q", " ")
    op = request.GET.get("op", " ")
    from_topic = request.GET.get("from_topic", " ")
    orderby = request.GET.get("orderby", " ")

    p = Post.objects.all()
    if searchstring != " ":
        p = p.filter(title__icontains=searchstring)
    if op != None or op != " ":
        p = p.filter(userOP__username__icontains=op)
    if from_topic != None or from_topic != " ":
        p = p.filter(topic__name__icontains=from_topic)

    if orderby != None or orderby != " ":
        if orderby == "Lowest score":
            p = p.annotate(numUp=Count("userUpVotesPost")) \
                .annotate(numDown=Count("userDownVotesPost")) \
                .annotate(score=F("numUp") - F("numDown")) \
                .order_by("score")
        elif orderby == "Most commented":
            p = p.order_by("-nComments")
        elif orderby == "Least commented":
            p = p.order_by("nComments")
        else:
            #by default it orders by highest score
            p = p.annotate(numUp=Count("userUpVotesPost"))\
            .annotate(numDown=Count("userDownVotesPost"))\
            .annotate(score=F("numUp") - F("numDown"))\
            .order_by("-score")
    pages = pagination(request, p, num=10)
    tparams = {
        'items': pages[0],
        'page_range': pages[1],
        'searchbar': 'search_post',
        'year': datetime.now().year,
        'param': "q=" + searchstring + "&op=" + op + "&from_topic="+from_topic+"&orderby="+orderby,
        "results": p
    }
    return render(request, "search_posts.html", tparams)


def search_topic(request):
    searchstring = request.GET.get("q", " ")
    user_creator = request.GET.get("user_creator", " ")
    orderby = request.GET.get("orderby", " ")
    t = Topic.objects.all()
    if searchstring != " ":
        t = t.filter(name__icontains=searchstring)
    if user_creator != None or user_creator != " ":
        t = t.filter(userCreator__username__icontains=user_creator)
    if orderby != None or orderby != " ":
        if orderby == "Least subscribers":
            t = t.annotate(nsubs=Count("profile__subscriptions")).order_by("nsubs")
        if orderby == "Most subscribers":
            t = t.annotate(nsubs=Count("profile__subscriptions")).order_by("-nsubs")
        else:
            t = t.order_by("name")
    pages = pagination(request, t, num=10)
    tparams = {
        'items': pages[0],
        'page_range': pages[1],
        'searchbar': 'search_topic',
        'year': datetime.now().year,
        'param': "q=" + searchstring + "&user_creator=" + user_creator +"&orderby="+orderby,
        "results": t
    }
    return render(request, "search_topics.html", tparams)


def search_user(request):
    searchstring = request.GET.get("q", " ")
    name = request.GET.get("name", " ")
    email = request.GET.get("email", " ")
    orderby = request.GET.get("orderby", " ")

    p = Profile.objects.all()
    if searchstring != " ":
        p = p.filter(user__username__icontains=searchstring)
    if name != None or name != " ":
        p = p.filter(Q(user__first_name__icontains=name) | Q(user__last_name__icontains=name))
    if email != None or email != " ":
        p = p.filter(user__email__icontains=email)

    if orderby != None or orderby != " ":
        if orderby == "Most karma":
            p = p.order_by()
        #if orderby == "Least karma":
            #p = p.order_by()
        else:
            p = p.order_by("user__username")
    pages = pagination(request, p, num=10)
    tparams = {
        'items': pages[0],
        'page_range': pages[1],
        'searchbar': 'search_user',
        'year': datetime.now().year,
        'param': "q=" + searchstring + "&name=" + name + "&email="+email+"&orderby="+orderby,
        "results": p
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

        score_posts = get_user_karma_posts(username)
        score_comments = get_user_karma_comments(username)

        tparams["karma_posts"] = score_posts
        tparams["karma_comments"] = score_comments
        tparams["sidebar"] = "user_page"
        tparams["profile_user"] = User.objects.get(username=username)
        return render(request, 'profile_page.html', tparams)
    except User.DoesNotExist:
        tparams = {"user": username}
        return render(request, 'user_not_found.html', tparams)

def get_user_karma_posts(username):
    up_posts_count = Post.objects.filter(userOP=User.objects.get(username=username)) \
    .annotate(countUp=Count("userUpVotesPost"))
    down_posts_count = Post.objects.filter(userOP=User.objects.get(username=username)) \
        .annotate(countDown=Count("userDownVotesPost"))
    score_posts = 0
    for i in up_posts_count:
        score_posts += i.countUp
    for i in down_posts_count:
        score_posts -= i.countDown
    return score_posts

def get_user_karma_comments(username):
    up_comments_count = Comment.objects.filter(user=User.objects.get(username=username)) \
        .annotate(countUp=Count("userUpVotesComments"))
    down_comments_count = Comment.objects.filter(user=User.objects.get(username=username)) \
        .annotate(countDown=Count("userDownVotesComments"))
    score_comments = 0
    for i in up_comments_count:
        score_comments += i.countUp
    for i in down_comments_count:
        score_comments -= i.countDown
    return score_comments

def get_user_karma_total(username):
    return get_user_karma_comments(username) + get_user_karma_posts(username)

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
    editGET = request.GET.get("e")
    edit = False
    if request.method == 'POST':
        form = topicCreateForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # insert new topic on DB
            topic = form.cleaned_data["topicName"]
            description = form.cleaned_data["description"]
            rules = form.cleaned_data["rules"]
            check_if_isedit = form.cleaned_data["check_if_isedit"] # this field is to check if the form is for edit or create
            if check_if_isedit == "false":
                # create topic
                if Topic.objects.filter(name__iexact=topic).exists():  # topic with same name exists
                    return render(request, 'topic_create.html', {'form': form, 'error': "A topic with this"
                            +" name already exists. Please, choose a different name"})
                t = Topic(name=topic, description=description, rules=rules, userCreator=request.user)
                t.save()
                return render(request, 'topic_created_success.html', {"topic": t})
            else:
                t = Topic.objects.get(name=check_if_isedit)
                t.name=topic
                t.description = description
                t.rules = rules
                t.save()
                return topicPage(request, topic)
    else:
        if editGET == None:
            #creating topic
            form = topicCreateForm(initial={'check_if_isedit':"false"})
        else:
            # edit topic
            edit = True
            topic = Topic.objects.get(name=editGET)
            form = topicCreateForm(initial={'topicName': topic.name,
                        'description': topic.description, 'rules': topic.rules, 'check_if_isedit': topic.name})
    return render(request, 'topic_create.html', {'form': form, "edit":edit})


def topicCreatedSuccess(request):
    return render(request, "topic_created_success.html")


def topicPage(request, topicName, postOrder="popular"):
    topic = Topic.objects.get(name__iexact=topicName)
    isUserSubscribed = False
    if (postOrder == "new"):
        p = Post.objects.filter(topic__name__iexact=topicName).order_by("-date")
    elif (postOrder == "popular"):
        p = Post.objects.filter(topic__name__iexact=topicName).order_by("-clicks")
    else:
        p = Post.objects.filter(topic__name__iexact=topicName).annotate(numUp=Count("userUpVotesPost"))\
        .annotate(numDown=Count("userDownVotesPost"))\
        .annotate(score=F("numUp") - F("numDown"))\
        .order_by("-score")
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        if topic in profile.subscriptions.all():
            isUserSubscribed = True
        if request.method == 'POST':
            if not isUserSubscribed:
                # add a subscription
                profile.subscriptions.add(topic)  # add this topic to his list of subscribed topics
                profile.save()
                isUserSubscribed = True  # user will now be subscribed
            else:
                # remove a subscription
                profile.subscriptions.remove(topic)
                profile.save()
                isUserSubscribed = False
        pages = pagination(request, p, num=10)
        tparams = {
            'items': pages[0],
            'page_range': pages[1],
            "isUserSubscribed": isUserSubscribed,
            "postOrder": postOrder,
            "currentTopic": Topic.objects.get(name__iexact=topicName),
            "posts": p,
        }
        return render(request, "topic.html", tparams)
    else:
        if topic is None:
            return custom_redirect('search', q=topicName)
        else:
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

@csrf_exempt
def vote_post(request):
    if request.is_ajax() and request.method == 'POST':
        data = json.loads(request.body)
        post = Post.objects.get(id=data["post_id"])
        if data["vote"] == "up":
            if request.user.profile in post.userUpVotesPost.all():
                post.userUpVotesPost.remove(request.user.profile)
                request.user.profile.post_user_up.remove(post)
                request.user.profile.save()
                post.save()
            else:
                post.userUpVotesPost.add(request.user.profile)
                post.save()
                # check if there is downvote, if so, delete it
                if request.user.profile in post.userDownVotesPost.all():
                    post.userDownVotesPost.remove(request.user.profile)
                    request.user.profile.post_user_down.remove(post)
                    request.user.profile.save()
                    post.save()
        elif data["vote"] == "down":
            if request.user.profile in post.userDownVotesPost.all():
                post.userDownVotesPost.remove(request.user.profile)
                request.user.profile.post_user_down.remove(post)
                request.user.profile.save()
                post.save()
            else:
                post.userDownVotesPost.add(request.user.profile)
                post.save()
                # check if there is upvote, if so, delete it
                if request.user.profile in post.userUpVotesPost.all():
                    post.userUpVotesPost.remove(request.user.profile)
                    request.user.profile.post_user_up.remove(post)
                    request.user.profile.save()
                    post.save()
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

@login_required
def createPost(request, topicName):
    topic = Topic.objects.get(name=topicName)
    editGET = request.GET.get("e")
    edit = False
    if request.method == 'POST':
        form = CreatePost(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # insert new post on DB
            title = form.cleaned_data["title"]
            content = form.cleaned_data["content"]
            check_if_isedit = form.cleaned_data["check_if_isedit"] #this field is to check if the form is for edit or create
            if check_if_isedit == "false": #create post
                post = Post(userOP=request.user, title=title, content=content, topic=topic)
            else:
                #post exists, we are editing
                post = Post.objects.get(id=int(check_if_isedit))
                post.title = title
                post.content = content
            post.save()
            return topicPage(request, topicName)
    else:
        if editGET == None:
            form = CreatePost(initial={'check_if_isedit':"false"}) #we are creating a post
        else:
            #edit post
            edit=True
            post = Post.objects.get(id=int(editGET))
            form = CreatePost(initial={'title': post.title, 'content': post.content, 'check_if_isedit':post.id})
    return render(request, "create_post.html", {"form": form, "topic": topic, "edit":edit})

@login_required
def removePost(request, topicName):
    postID = request.GET.get("e")
    post = Post.objects.get(id=int(postID))
    post.delete()
    return render(request, "delete_post_confirmed.html", {"topicName":topicName})

@login_required
def removePost_confirm(request, topicName):
    postID = request.GET.get("e")
    post = Post.objects.get(id=int(postID))
    return render(request, "delete_post_confirmation.html", {"post":post})


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