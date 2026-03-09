from django.db import models

class News(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    image = models.URLField()
    published_at = models.DateTimeField()

    def __str__(self):
        return self.title