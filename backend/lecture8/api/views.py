from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from lecture8.api.serializers import RegisterUser, UserSerializer

class RegisterUserAPI(APIView):
    def post(self, request):
        serializer = RegisterUser(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        user = User.objects.create_user(data['username'], data['email'], data['password'])

        Token.objects.create(user=user)
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)
