"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from lecture6 import views as l6views
from lecture8.api import views as l8views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('admin/', admin.site.urls),   
    path('api/cards/', l6views.CardListAPIView.as_view(), name='card-list'),
    path('api/cards/<int:pk>/',l6views.CardDetailAPIView.as_view(), name='card-detail'),
    path('api/populate/',l6views.populate_users_with_cards_api, name='populate'),
    path('api/user-cards/<str:username>/',l6views.user_cards_api, name='user-cards-api'),
    path('api/auth/register/', l8views.RegisterUserAPI.as_view(), name='register'),
    path('api/auth/login/', obtain_auth_token, name='login'),
    path('api/auth/verify-token', l6views.verify_token, name='verify-token')
]
