from django.http import HttpResponse
from django.shortcuts import render

from lecture4.models import Card


# Create your views here.

def hello(request):
    print(f"request type: {request.method}")
    return HttpResponse('Hello World!')

def card(request, color):
    return render(request, 'card.html', {'color': color})

### card3

def card3_list_cards(request):
    # GET
    if request.method == "GET":
        allcards = Card.objects.all()
        response = ""
        for c in allcards:
            response = response + "," + str(c.pk)
        return HttpResponse("Cards: " + response)
    else:
        return HttpResponse("Method Not Allowed")

def card3_view_card(request, id):
    if request.method == "GET":
        try:
            c = Card.objects.get(pk=id)
            return HttpResponse("Card deleted")
        except:
            return HttpResponse("Not Found")

def card3_delete_card(request, id):
    if request.method == "DELETE":
        try:
            c = Card.objects.get(pk=id)
            c.delete()
        except:
            return HttpResponse("Method Not Allowed")
    else:
        print("Method Not Allowed")
