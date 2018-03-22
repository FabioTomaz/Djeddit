from django.db import models

# Create your models here.

class Topic(models.Model):
    name = models.CharField(max_length=80)
    description = models.CharField(max_length=300)
    def __str__(self):
        return self.name

class User(models.Model):
    userName = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    user_details = models.CharField(max_length=200)
    def __str__(self):
        return self.userName

class Post(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    content = models.CharField(max_length=100000)
    date = models.DateTimeField()
    #type = models.CharField(max_lenght = 50)
    userOP = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.title+":\n" + self.content

class UserSubscriptions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=True)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, primary_key=True)
    def __str__(self):
        return self.user+": " + self.topic

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, primary_key=True)
    date = models.DateTimeField(primary_key=True)
    text = models.CharField(max_length=10000)
    def __str__(self):
        return self.text