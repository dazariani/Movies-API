from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, ActorViewSet, GenreViewSet, UserViewSet, MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='usersModel')
router.register(r'movies', MovieViewSet, basename='moviesModel')
router.register(r'genres', GenreViewSet, basename='genresModel')
router.register(r'actors', ActorViewSet, basename='actorModel')

urlpatterns = [
  path('', include(router.urls)),
  # path('bla', movieTestView),
  path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
  
]


