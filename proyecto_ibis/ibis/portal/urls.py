#Este archivo URL es solo válido para la aplicación en la que está, en este caso core
from django.conf.urls import url
from django.urls import path
from portal import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    #Mis URL
    path('', views.home, name="home"),
    path('about/', views.about, name="about"),
    path('services/', views.services, name="services"),
    path('getevents',views.getEvents,name="getevents"),
    path('gettimetables',views.getTimetables,name="gettimetables"),
    path('getmenus',views.getMenus,name="getmenus"),
    path('search',views.search,name="search"),
    path('details/<int:id>/',views.details,name="details"),   
    path('getnews',views.getNews,name="getnews"),
]
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)