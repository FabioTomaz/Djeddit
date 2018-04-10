from django.contrib import admin
from app.models import Topic, Comment, UserSubscriptions, Post, Profile, User_votes_comment, User_votes_post
# Register your models here.

admin.site.register(Topic)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(UserSubscriptions)
admin.site.register(Profile)
admin.site.register(User_votes_comment)
admin.site.register(User_votes_post)
