from rest_framework import serializers
from .models import Actor, Genre, Movie
from django.contrib.auth.models import User

class ActorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Actor
    fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
  class Meta:
    model = Genre
    fields = '__all__'

    
class MovieSerializer(serializers.ModelSerializer):
  class Meta:
    model = Movie
    fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'