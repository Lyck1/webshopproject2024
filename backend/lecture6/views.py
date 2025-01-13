import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Card
from .serializers import CardSerializer, UserWithCardSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth.models import User
class CardListAPIView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    authentication_classes = (TokenAuthentication,)
    def get(self, request):
        cards = Card.objects.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CardDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return None

    def get(self, request, pk):
        card = self.get_object(pk)
        if card is None:
            return Response({"error": "Card not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CardSerializer(card)
        return Response(serializer.data)

    def put(self, request, pk):
        card = self.get_object(pk)
        if card is None:
            return Response({"error": "Card not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CardSerializer(card, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        card = self.get_object(pk)
        if card is None:
            return Response({"error": "Card not found"}, status=status.HTTP_404_NOT_FOUND)
        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def populate_users_with_cards_api(request):
    data = {
        'testuser1': ['pink', 'blue', 'magenta'],
        'testuser2': ['purple', 'red', 'grey'],
        'testuser3': ['green', 'yellow', 'orange'],
        'testuser4': [],
        'testuser5': [],
        'testuser6': [],
    }

    if User.objects.filter(username='testuser1').exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    created_users = []
    for username, card_colors in data.items():
        email = username + '@shop.aa'
        user, created = User.objects.get_or_create(username=username, email=email)
        user.set_password('pass' + username[-1])  # Use set_password to hash the password
        user.save()
        for color in card_colors:
            description = 'Made by: ' + username
            price = random.randint(1, 100)
            Card.objects.create(user_id=user, color=color, price=price, description=description)
        created_users.append(username)

    if created_users:
        return Response({
            "message": "Users and cards created successfully!",
            "users": created_users
        })
    return Response({
        "message": "No users were created. They may already exist",
    })


#Fetch Users cards

@api_view(['GET'])
def user_cards_api(request, username):
    try:
        user=User.objects.get(username=username)
        serializer=UserWithCardSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error":"User not found"},status=404)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def verify_token(request):
    user = request.user
    return Response({"isValid": True, "userId": user.id}, status=status.HTTP_200_OK)