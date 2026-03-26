from django.db import models
from django.contrib.auth.models import User

class News(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    image = models.URLField()
    published_at = models.DateTimeField()

    def __str__(self):
        return self.title


class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    url = models.URLField()
    image_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

class SearchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    query = models.CharField(max_length=200)
    searched_at = models.DateTimeField(auto_now_add=True)  

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    location = models.CharField(max_length=100)   

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article_url = models.URLField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)    

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article_url = models.URLField() 

class RecentView(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article_url = models.URLField()
    viewed_at = models.DateTimeField(auto_now_add=True)

    