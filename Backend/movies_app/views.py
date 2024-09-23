from rest_framework import viewsets
from .serializers import ActorSerializer, GenreSerializer, MovieSerializer, CustomUserSerializer
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Actor, Genre, Movie, CustomUser
from django.shortcuts import HttpResponse 
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response




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


# CustomUser viewSet
class UserViewSet(viewsets.ModelViewSet):
  queryset = CustomUser.objects.all()
  serializer_class = CustomUserSerializer
  permission_classes = (IsAdminUser,)



# class UserViewSet(viewsets.ModelViewSet):
#   queryset = User.objects.all()
#   serializer_class = UserSerializer
#   permission_classes = [AllowAny]


# def movieTestView(request):
#   movie = Movie.objects.get(id=2)
#   actors = movie.actors.all()
#   for actor in actors:
#     print(actor.id)
#   return HttpResponse('Hi there')


# Current user
class UserView(APIView):
    def get(self, request): 
        if not request.user.id:
            raise AuthenticationFailed('Unauthenticated :(')
        
        user = CustomUser.objects.filter(id=request.user.id).first()

        serializer = CustomUserSerializer(user)

        return Response(serializer.data)
  


