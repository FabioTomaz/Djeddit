from django.db import models

# Create your models here.

class Topic(models.Model):
    name = models.CharField(max_length=80, blank=False, unique=True)
    description = models.CharField(max_length=300, blank=False)
    def __str__(self):
        return self.name

class User(models.Model):
    userName = models.CharField(max_length=50, blank=False, unique=True)
    email = models.EmailField(max_length=50, blank=False, unique=True)
    user_details = models.CharField(max_length=200, blank=True)
    def __str__(self):
        return self.userName

class Post(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    title = models.CharField(max_length=120, blank=False) #campo obrigatório
    content = models.CharField(max_length=100000, blank=False)
    date = models.DateTimeField()
    #type = models.CharField(max_lenght = 50)
    userOP = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.title+":\n" + self.content

class UserSubscriptions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    def __str__(self):
        return self.user+": " + self.topic
    class Meta:
        unique_together = (("user", "topic"),)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField()
    text = models.CharField(max_length=10000, blank=False)
    def __str__(self):
        return self.text
    class Meta:
        unique_together = (("user", "post", "date"),)