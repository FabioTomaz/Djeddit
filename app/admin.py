from django.contrib import admin
from app.models import Topic, Comment, Post, Profile
# Register your models here.

admin.site.register(Topic)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Profile)
