from django.db import models

# Create your models here.

class Card(models.Model):
    color = models.CharField(max_length=10)
