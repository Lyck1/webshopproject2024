from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from lecture4.models import Card
from django.shortcuts import redirect

# Create your views here.

@csrf_exempt
def hello(request):
    print(f"request type {request.method}")
    return HttpResponse("Hello")

def card(request, color):
    return render(request, 
                  'card.html', {'card_color': color})


#### card3
def card3_list_cards(request):
    #GET
    if request.method =='GET':
        allcards = Card.objects.all()
        response =""
        for c in allcards:
            response = response + " " + str(c.pk)
        return HttpResponse("Cards:" + response)
    else:
        return HttpResponse("Method not allowed")


def card3_view_card(request, id):
    if request.method=='GET':
        try:
            c = Card.objects.get(pk=id)
            return HttpResponse(f"Card color {c.color}") 
        except:
            return HttpResponse(f"Card not found")
        

@csrf_exempt
def card3_delete_card(request, id):
     if request.method=='DELETE':
        try:
            c = Card.objects.get(pk=id)
            c.delete()
            return HttpResponse("Card deleted") 
        except:
            return HttpResponse(f"Card not found")
     else:
        return HttpResponse("Method not allowed")  
     
     
@csrf_exempt
def card3_add_card(request, color):
     if request.method=='POST':
        c = Card(color=color)
        c.save()
        return HttpResponse(f"Card {c.color} added") 
        #Try this out as a good practice: redirect after successful post
        #return redirect('/card3/')
     else:
        return HttpResponse("Method not allowed")  