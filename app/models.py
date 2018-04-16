from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models
from datetime import datetime

from django.db.models.signals import post_save
from django.dispatch import receiver


class Topic(models.Model):
    name = models.CharField(max_length=80, blank=False, primary_key=True)
    rules = models.CharField(max_length=500)
    description = models.CharField(max_length=300, blank=False)
    userCreator = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_date = models.DateField(blank=False, default=datetime.now)

    def __str__(self):
        return self.name


class Profile(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('N', 'None')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_details = models.CharField(max_length=200, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    registration_date = models.DateField(null=False, default=datetime.now)
    user_picture = models.ImageField(upload_to='user_data/pictures/',
                                     default='user_data/pictures/pic.png',
                                     blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='N')
    subscriptions = models.ManyToManyField(Topic, blank=True)
    PRIVACY_CHOICES = (
        ('N', 'No One'),
        ('F', 'Friends'),
        ('E', 'Everybody')
    )

    profile_info_permission = models.CharField(max_length=1, choices=PRIVACY_CHOICES, default='F')
    profile_friends_permission = models.CharField(max_length=1, choices=PRIVACY_CHOICES, default='F')
    profile_topics_permission = models.CharField(max_length=1, choices=PRIVACY_CHOICES, default='F')
    profile_posts_permission = models.CharField(max_length=1, choices=PRIVACY_CHOICES, default='F')
    profile_comments_permission = models.CharField(max_length=1, choices=PRIVACY_CHOICES, default='F')

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class Friend(models.Model):
    users = models.ManyToManyField(Profile, blank=True)
    current_user = models.ForeignKey(Profile, related_name="owner", null=True,
                                     on_delete=models.CASCADE)

    @classmethod
    def make_friend(cls, current_user, new_friend):
        friend, created = cls.objects.get_or_create(
            current_user=current_user
        )
        friend.users.add(new_friend)
        friend, created = cls.objects.get_or_create(
            current_user=new_friend
        )
        friend.users.add(current_user)

    @classmethod
    def remove_friend(cls, current_user, new_friend):
        friend, created = cls.objects.get_or_create(
            current_user=current_user
        )
        friend.users.remove(new_friend)
        friend, created = cls.objects.get_or_create(
            current_user=new_friend
        )
        friend.users.remove(current_user)

    def __str__(self):
        return str(self.current_user)


class Post(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    title = models.CharField(max_length=120, blank=False)  # campo obrigatório
    content = models.CharField(max_length=100000, blank=False)
    clicks = models.IntegerField(blank=False, default=0)
    userUpVotesPost = models.ManyToManyField(Profile, related_name='post_user_up', blank=True)
    userDownVotesPost = models.ManyToManyField(Profile, related_name='post_user_down', blank=True)
    userSaved = models.ManyToManyField(Profile, blank=True, related_name='user_post_saved')
    userHidden = models.ManyToManyField(Profile, blank=True, related_name='user_post_hidden')
    date = models.DateTimeField(auto_now=True)
    # type = models.CharField(max_lenght = 50)
    userOP = models.ForeignKey(User, on_delete=models.CASCADE)
    nComments = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.title + ":\n" + self.content


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)
    userUpVotesComments = models.ManyToManyField(Profile, related_name='comment_user_up',
                                                 blank=True)
    userDownVotesComments = models.ManyToManyField(Profile, related_name='comment_user_down',
                                                   blank=True)
    text = models.CharField(max_length=10000, blank=False)
    reply = models.ForeignKey("self", null=True, blank=True, related_name='replies',
                              on_delete=models.CASCADE)
    nReplies = models.IntegerField(default=0)

    def __str__(self):
        return self.text
