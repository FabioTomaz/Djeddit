from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import serializers
from app.models import Topic, Post, Comment, Report, Friend, Profile


class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id', "first_name", "last_name", "email", "date_joined")


class PrivacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'id',
            'profile_info_permission',
            'profile_friends_permission',
            'profile_topics_permission',
            'profile_posts_permission',
            'profile_comments_permission',
        )


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class ProfileInfoSerializer(serializers.ModelSerializer):
    user = UserSerializer2(many=False)

    def update(self, instance, validated_data):
        gender = validated_data.get('gender', instance.gender)
        birth_date = validated_data.get('birth_date', instance.birth_date)
        user_details = validated_data.get('user_details', instance.user_details)
        user = validated_data.get('user', instance.user)

        # Unless the application properly enforces that this field is
        # always set, the follow could raise a `DoesNotExist`, which
        # would need to be handled.

        instance_user = instance.user
        instance_user.email = user.email
        instance_user.first_name = user.first_name
        instance_user.last_name = user.last_name
        instance_user.save()

        instance.gender = gender
        instance.birth_date = birth_date
        instance.user_details = user_details
        instance.gender = gender
        instance.save()

        return instance

    class Meta:
        model = Profile
        fields = ('id',
                  'user',
                  'user_details',
                  'birth_date',
                  'gender',
                  )


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'user_picture'
        )


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer2(many=False, read_only=True)
    karma_posts = serializers.SerializerMethodField('get_user_karma_posts')
    karma_comments = serializers.SerializerMethodField('get_user_karma_comments')
    karma_total = serializers.SerializerMethodField('get_user_karma_total')

    def get_user_karma_posts(self, profile):
        up_posts_count = Post.objects.filter(userOP=User.objects.get(username=profile.user.username)) \
            .annotate(countUp=Count("userUpVotesPost"))
        down_posts_count = Post.objects.filter(userOP=User.objects.get(username=profile.user.username)) \
            .annotate(countDown=Count("userDownVotesPost"))
        score_posts = 0
        for i in up_posts_count:
            score_posts += i.countUp
        for i in down_posts_count:
            score_posts -= i.countDown
        return score_posts

    def get_user_karma_comments(self, profile):
        up_comments_count = Comment.objects.filter(user=User.objects.get(username=profile.user.username)) \
            .annotate(countUp=Count("userUpVotesComments"))
        down_comments_count = Comment.objects.filter(user=User.objects.get(username=profile.user.username)) \
            .annotate(countDown=Count("userDownVotesComments"))
        score_comments = 0
        for i in up_comments_count:
            score_comments += i.countUp
        for i in down_comments_count:
            score_comments -= i.countDown
        return score_comments

    def get_user_karma_total(self, profile):
        return self.get_user_karma_comments(profile) + self.get_user_karma_posts(profile)

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
                  'profile_comments_permission',
                  'karma_posts',
                  'karma_comments',
                  'karma_total'
                  )


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, read_only=True, required=False)

    class Meta:
        model = User
        fields = ('username', 'id', "first_name", "last_name", "email", "date_joined", "profile")


class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', "first_name", "last_name", "email", "password")

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.is_active = True
        user.save()
        return user


class TopicSerializer(serializers.ModelSerializer):
    userCreator = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Topic
        fields = ('name', 'rules', 'description', 'userCreator', 'creation_date')


class TopicCreationSerializer(serializers.ModelSerializer):
    userCreator = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Topic
        fields = ('name', "rules", "description", "userCreator")


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


class PostCreationSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(many=False, read_only=True)
    userOP = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Post
        fields = ('topic',
                  'title',
                  'content',
                  'userOP',
                  )


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    post = PostSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = ('id',
                  'user',
                  'post',
                  'date',
                  'userUpVotesComments',
                  'userDownVotesComments',
                  'text',
                  'reply',
                  'nReplies'
                  )


class CommentCreationSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    post = PostSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = ('user',
                  'post',
                  'text',
                  'reply'
                  )


class ReportSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=False)
    post = PostSerializer(many=False, read_only=False)

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
