# Generated by Django 2.0.2 on 2018-04-12 22:00

import datetime
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now=True)),
                ('text', models.CharField(max_length=10000)),
                ('nReplies', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('content', models.CharField(max_length=100000)),
                ('clicks', models.IntegerField(default=0)),
                ('date', models.DateTimeField(auto_now=True)),
                ('nComments', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_details', models.CharField(blank=True, max_length=200)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('registration_date', models.DateField(default=datetime.datetime.now)),
                ('user_picture', models.ImageField(blank=True, default='user_data/pictures/pic.png', upload_to='user_data/pictures/')),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('N', 'None')], default='', max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('name', models.CharField(max_length=80, primary_key=True, serialize=False)),
                ('rules', models.CharField(max_length=500)),
                ('description', models.CharField(max_length=300)),
                ('nSubscribers', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('creation_date', models.DateField(default=datetime.datetime.now)),
                ('userCreator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='profile',
            name='topics',
            field=models.ManyToManyField(to='app.Topic'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='topic',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Topic'),
        ),
        migrations.AddField(
            model_name='post',
            name='userDownVotesPost',
            field=models.ManyToManyField(blank=True, related_name='post_user_down', to='app.Profile'),
        ),
        migrations.AddField(
            model_name='post',
            name='userHidden',
            field=models.ManyToManyField(blank=True, related_name='user_post_hidden', to='app.Profile'),
        ),
        migrations.AddField(
            model_name='post',
            name='userOP',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='userSaved',
            field=models.ManyToManyField(blank=True, related_name='user_post_saved', to='app.Profile'),
        ),
        migrations.AddField(
            model_name='post',
            name='userUpVotesPost',
            field=models.ManyToManyField(blank=True, related_name='post_user_up', to='app.Profile'),
        ),
        migrations.AddField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Post'),
        ),
        migrations.AddField(
            model_name='comment',
            name='reply',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='app.Comment'),
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='comment',
            name='userDownVotesComments',
            field=models.ManyToManyField(blank=True, related_name='comment_user_down', to='app.Profile'),
        ),
        migrations.AddField(
            model_name='comment',
            name='userUpVotesComments',
            field=models.ManyToManyField(blank=True, related_name='comment_user_up', to='app.Profile'),
        ),
    ]
