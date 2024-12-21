from rest_framework import serializers
from .models import Card
from django.contrib.auth.models import User
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'color', 'description', 'price', 'created_at']

class UserWithCardSerializer(serializers.ModelSerializer):
    cards=CardSerializer(many=True,read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'cards']
