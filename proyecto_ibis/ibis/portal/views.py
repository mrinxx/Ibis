from django.shortcuts import render, HttpResponse
from django.http import JsonResponse #Se utiliza para mandar la respuesta en formato JSON
from django.core.serializers import serialize #Se usa para poder pasar QuerySet a Json
from .models import Event,  Menu, Timetable,New
from users.models import Teacher, Cicle
from django.contrib.auth.models import User

def home(request):
    return render(request, "portal/html/index.html")

def about(request):
    users=User.objects.all()
    teachers=Teacher.objects.all()
    cicles=Cicle.objects.all()
    return render(request, "portal/html/about.html",{'teachers':teachers,'users':users,'cicles':cicles})

def services(request):
    return render(request, "portal/html/services.html")


def getEvents(request):
    data = {
        'events' : serialize('json',Event.objects.all().order_by('date')) 
    }
    return JsonResponse(data)



def getTimetables(request):
    timetables=Timetable.objects.all()
    cicles=[]
    for timetable in timetables:
        cicle=Cicle.objects.filter(id=timetable.cicle_id).first()
        cicles.append(cicle)
    data={
        'timetables' : serialize('json',timetables),
        'cicles':serialize('json',cicles)
    }
    return JsonResponse(data)

def getMenus(request):
    data={
        'menus' : serialize('json',Menu.objects.all())
    }
    return JsonResponse(data)


def getNews(request):
    data = {
        'news' : serialize('json',New.objects.all())
    }
    return JsonResponse(data)

def details(request,id):
    mynew=New.objects.filter(id=id)
    images=[]
    if mynew.first().media2:
        images.append(mynew.first().media2)
    if mynew.first().media3:
        images.append(mynew.first().media3)
    if mynew.first().media4:
        images.append(mynew.first().media4)
    if mynew.first().media5:
        images.append(mynew.first().media5)
    if mynew.first().media6:
        images.append(mynew.first().media6)
    return render(request,"portal/html/details.html",{'new':mynew,'images':images})

def search(request):
    tosearch=request.GET["toSearch"]+"%"
    news=New.objects.raw("SELECT * FROM news where title like %s",[tosearch]) 
    events=Event.objects.raw("SELECT * FROM events where Description like %s",[tosearch]) 
    data={
        'news' : serialize('json',news),
        'events' : serialize('json',events),
    }
    return JsonResponse(data)
    

