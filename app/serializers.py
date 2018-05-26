from django.contrib.auth.models import User
from rest_framework import serializers

from app.models import Topic, Profile, Post, Comment, Report, Friend


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id', "first_name", "last_name", "email")


class TopicSerializer(serializers.ModelSerializer):
    userCreator = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Topic
        fields = ('name', 'rules', 'description', 'userCreator', 'creation_date')


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Profile
        fields = ('id',
                  'user',
                  'user_details',
                  'birth_date',
                  'registration_date',
                  'user_picture',
                  'gender',
                  'subscriptions',
                  'profile_info_permission',
                  'profile_friends_permission',
                  'profile_topics_permission',
                  'profile_posts_permission',
                  'profile_comments_permission'
                  )


class PostSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(many=False, read_only=True)
    userOP = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Post
        fields = ('id',
                  'topic',
                  'title',
                  'content',
                  'clicks',
                  'userUpVotesPost',
                  'userDownVotesPost',
                  'userSaved',
                  'userHidden',
                  'date',
                  'userOP',
                  'nComments',
                  )


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = ('user',
                  'post',
                  'date',
                  'userUpVotesComments',
                  'userDownVotesComments',
                  'text',
                  'reply',
                  'nReplies'
                  )


class ReportSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    post = PostSerializer(many=False, read_only=True)

    class Meta:
        model = Report
        fields = ('id',
                  'post',
                  'user',
                  'comment',
                  'accepted'
                  )


class FriendSerializer(serializers.ModelSerializer):
    current_user = ProfileSerializer(many=False, read_only=True)

    class Meta:
        model = Friend
        fields = ('users',
                  'current_user'
                  )
