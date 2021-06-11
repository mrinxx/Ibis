from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.core.exceptions import ValidationError
from datetime import date
from users.models import Cicle
# Create your models here.
#Modelos que se van a  migrar a la base de datos y que sirven para formae los elementos de la web



#################Validators##############
def validate_date(value):
    actualdate=date.today()
    if(actualdate>value):
        raise ValidationError(
            "La fecha del evento tiene que ser posterior a la actual"
        )
#########################################
#MODELO DE EVENTOS
class Event(models.Model):
    id=models.AutoField(primary_key=True)
    date=models.DateField(blank=False,null=False,validators=[validate_date])
    Description=models.CharField(max_length=400)
    created_at=models.DateField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)

    class Meta:
        db_table="events"
        ordering= ["date"]

#SELECCION DE 

# #MODELO DE HORARIOS
class Timetable(models.Model):
    id=models.AutoField(primary_key=True)
    cicle = models.OneToOneField(Cicle, on_delete=models.CASCADE,unique=True)  
    timetable_image=models.ImageField(upload_to="timetables")
    timetable_created_at=models.DateField(auto_now_add=True)
    timetable_updated_at=models.DateField(auto_now=True)
    created_at=models.DateField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)

    class Meta:
        db_table="timetables"

#MODELO DE MENUS 
class Menu(models.Model):
    id=models.AutoField(primary_key=True)
    cicle = models.OneToOneField(Cicle, on_delete=models.CASCADE,unique=True)  
    menu_image=models.ImageField(upload_to="menus") 
    created_at=models.DateField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)

    class Meta:
        db_table="menus"

class New(models.Model):
    id=models.AutoField(primary_key=True) #Id autoincremental
    title=models.CharField(max_length=50)
    subtitle=models.CharField(max_length=100)
    content=models.TextField(max_length=3000)
    media1=models.ImageField(upload_to="news")
    #Estas imágenes no son obligatorias, solo lo es una para el encabezado de la noticia
    media2=models.ImageField(blank=True, null=True)
    media3=models.ImageField(blank=True, null=True)
    media4=models.ImageField(blank=True, null=True)
    media5=models.ImageField(blank=True, null=True)
    media6=models.ImageField(blank=True, null=True)
    created_at=models.DateField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)

    class Meta:
        db_table="news"

    



