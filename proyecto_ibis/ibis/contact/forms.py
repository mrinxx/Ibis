from django import forms
from django.forms.widgets import NumberInput, Textarea

#Formulario de contacto
class ContactForm(forms.Form):
    name=forms.CharField(label='Nombre',required=True)
    lastname=forms.CharField(label="Apellidos",required=True)
    phonenumber=forms.CharField(label="Número de teléfono",min_length=9,max_length=9,widget=forms.NumberInput)
    email=forms.CharField(label="Correo electónico",widget=forms.EmailInput,required=True)
    message=forms.CharField(label="Mensaje",required=True,widget=Textarea,max_length=1500)

    