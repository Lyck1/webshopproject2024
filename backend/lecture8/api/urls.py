from django.urls import path
from lecture8.api.views import RegisterUserAPI

urlpatterns = [
    path('resgister/', RegisterUserAPI.as_view()),
]
