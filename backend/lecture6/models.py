from django.db import models
from django.contrib.auth.models import User

class Card(models.Model):
    objects = None
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards', default=1 )
    color = models.CharField(max_length=10)
    description = models.CharField(max_length=40)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.color
    
class Order(models.Model):
    order_id = models.CharField(max_length=10)
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order_id
