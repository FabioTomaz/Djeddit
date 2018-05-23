from rest_framework import serializers

from app.models import Topic, Profile, Post, Comment, Report, Friend


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('name', 'rules', 'description', 'userCreator', 'creation_date')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user',
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
    class Meta:
        model = Post
        fields = ('topic',
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
    class Meta:
        model = Report
        fields = ('post',
                  'user',
                  'comment',
                  'accepted'
                  )


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('users',
                  'current_user'
                  )
