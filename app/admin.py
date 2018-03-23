from django.contrib import admin
from app.models import User, Topic, Comment, UserSubscriptions, Post
# Register your models here.

admin.site.register(User)
admin.site.register(Topic)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(UserSubscriptions)
