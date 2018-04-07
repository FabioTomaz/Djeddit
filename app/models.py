from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_details = models.CharField(max_length=200, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    user_picture = models.ImageField(upload_to='user_data/pictures/', blank=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class Topic(models.Model):
    name = models.CharField(max_length=80, blank=False, primary_key=True)
    rules = models.CharField(max_length=500)
    description = models.CharField(max_length=300, blank=False)
    userCreator = models.ForeignKey(User, on_delete=models.CASCADE)
    nSubscribers = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.name


class Post(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    title = models.CharField(max_length=120, blank=False)  # campo obrigatório
    content = models.CharField(max_length=100000, blank=False)
    score = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now=True)
    # type = models.CharField(max_lenght = 50)
    userOP = models.ForeignKey(User, on_delete=models.CASCADE)
    nComments = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.title + ":\n" + self.content


class UserSubscriptions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user) + ": " + str(self.topic)

    class Meta:
        unique_together = (("user", "topic"),)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)
    score = models.IntegerField(default=0)
    text = models.CharField(max_length=10000, blank=False)
    reply = models.ForeignKey("self", null=True, blank=True, related_name='replies', on_delete=models.CASCADE)
    nReplies = models.IntegerField(default=0)

    def __str__(self):
        return self.text


class User_votes_post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    isUpvote = models.BooleanField(default=True)  # if false, it is a down vote


class User_votes_comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    isUpvote = models.BooleanField(default=True)  # if false, it is a down vote
