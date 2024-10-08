from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class Actor(models.Model):
  firstname = models.CharField(max_length=20)
  lastname = models.CharField(max_length=20)

  def __str__(self):
    return f'{self.firstname} {self.lastname}'
  


class Genre(models.Model):
  name = models.CharField(max_length=50)

  def __str__(self):
    return self.name
  

class Movie(models.Model):
  title = models.CharField(max_length=50)
  year = models.IntegerField()
  genre = models.ManyToManyField(Genre)
  rating = models.DecimalField(max_digits=4, decimal_places=2)
  director = models.CharField(max_length=50)
  actors = models.ManyToManyField(Actor, related_name='movies')
  poster = models.ImageField(upload_to='images/posters/', blank=True, default='images/posters/default.jpeg')
  country = models.CharField(max_length=20)
  language = models.CharField(max_length=20)

  def __str__(self):
    return self.title
  

class CustomUser(AbstractUser):
  avatar = models.ImageField(upload_to='images/users/', blank=True, default='images/users/default.png')
  bookmarked = models.ManyToManyField(Movie, related_name="movie", blank=True, default=False)

  def __str__(self):
    return self.username
