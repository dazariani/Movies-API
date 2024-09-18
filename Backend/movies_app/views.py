from rest_framework import viewsets
from .serializers import ActorSerializer, GenreSerializer, MovieSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from .models import Actor, Genre, Movie
from django.contrib.auth.models import User
from django.shortcuts import HttpResponse 
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer


# MyTokenObtainPairView
class MyTokenObtainPairView(TokenObtainPairView):
   serializer_class = MyTokenObtainPairSerializer  



# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
  queryset = Movie.objects.all()
  serializer_class = MovieSerializer
  permission_classes = [AllowAny]


class ActorViewSet(viewsets.ModelViewSet):
  queryset = Actor.objects.all()
  serializer_class = ActorSerializer
  permission_classes = [AllowAny]


class GenreViewSet(viewsets.ModelViewSet):
  queryset = Genre.objects.all()
  serializer_class = GenreSerializer
  permission_classes = [AllowAny]


class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]


# def movieTestView(request):
#   movie = Movie.objects.get(id=2)
#   actors = movie.actors.all()
#   for actor in actors:
#     print(actor.id)
#   return HttpResponse('Hi there')
  


