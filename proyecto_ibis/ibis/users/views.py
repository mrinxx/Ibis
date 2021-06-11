from django.shortcuts import redirect, render
from django.http import HttpResponseRedirect,HttpResponseForbidden,JsonResponse #Se utiliza para mandar la respuesta en formato JSON
from django.core.serializers import serialize #Se usa para poder pasar QuerySet a Json
from .models import *
import datetime #utilizado para la validación de la fecha de nacimiento
from django.contrib.auth.models import User
from .forms import  *
from django.contrib.auth import  update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.template.loader import render_to_string
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import authenticate, login as django_login
# Create your views here.


######DECORADORES######
def only_guardians(func):
    def inner(*args, **kwargs):
        request = args[0] if args else kwargs['request'] if 'request' in kwargs else None
        if request is not None and request.user.is_staff:
            respuesta = HttpResponseForbidden()
            respuesta.writelines(render_to_string('errors/forbidden.html'))
            respuesta.close()
            return respuesta
        return func(*args, **kwargs)
    return inner

def only_teachers(func):
    def inner(*args, **kwargs):
        request = args[0] if args else kwargs['request'] if 'request' in kwargs else None
        if request is not None and not request.user.is_staff:
            respuesta = HttpResponseForbidden()
            respuesta.writelines(render_to_string('errors/forbidden.html'))
            respuesta.close()
            return respuesta
        return func(*args, **kwargs)
    return inner

#######################
#Vista que muestra el formulario de inicio de sesión
def login(request):
    print(request)
    form=LoginForm()
    return render(request, "registration/login.html",{'form':form})      


def changeFirstPassword(request):
    is_ok="ok"
    form=PasswordChangeForm(request.user)
    if request.method=="POST":
        form=PasswordChangeForm(request.user,request.POST)
        if form.is_valid():
            user=form.save()
            update_session_auth_hash(request,user)
            return redirect(reverse('userpanel'))
        else:
            is_ok="not ok"
            return render(request, 'registration/changepassword.html',{'form':form,'is_ok':is_ok})
    return render(request,'registration/changepassword.html',{'form':form})


def changePasswordTeacher(request):
    form=PasswordChangeForm(request.user)
    if request.method=="POST":
        form=PasswordChangeForm(request.user,request.POST)
        if form.is_valid():
            user=form.save()
            update_session_auth_hash(request,user)
            
    return HttpResponseRedirect(reverse('teacherpanel'))

def changePasswordGuardian(request):
    form=PasswordChangeForm(request.user)
    if request.method=="POST":
        form=PasswordChangeForm(request.user,request.POST)
        if form.is_valid():
            user=form.save()
            update_session_auth_hash(request,user)
            
    return HttpResponseRedirect(reverse('userpanel'))        

#Vista que realiza el "registro" de usuario en la BD
def register(request):
    # Peticion POST:
    #   -Se cogen los datos que podrían ser modificados por el usuario y se hace que se modifiquen en la base de datos
    #   -Se comprueban una serie de datos (checkboxes), si estos están en "on" significa que han sifdo marcados y por lo 
    #   tanto pasan a "si", ya que se guardan en la base de datos como "si" o "no" 
    #   -Se toma el usuario correspondiente al código de la BD y se modifica
    # registerform=GuardianUpdateForm()
    is_ok="ok"
    if request.method=="POST":
        code = request.POST.get('code')
        guardian=Guardian.objects.filter(guardiancode=code).first()
        if guardian.activated=="No":
            guardian.activated="Si"
            guardian.save()
            userguardian=User.objects.filter(id=guardian.user_id).first()
            user = authenticate(username=userguardian.username, password="cambiame")
            if user is not None:
                django_login(request, user)
                print(user)
                return HttpResponseRedirect(reverse('changefirstpassword'))
        else:
            is_ok="not ok"
            return HttpResponseRedirect(reverse('login'))

    
# # @method_decorator(testGuardian, name='dispatch')
@login_required(login_url="login") #en caso de no estar logueado, se redirige aqui
@only_guardians
def guardianPanel(request):
    is_ok=""
    user=User.objects.filter(username=request.user)  #usuario logueado
    guardian=Guardian.objects.filter(user_id=user[0].id) #tutor legal que corresponde al usuario logueado
    children=Alumn.objects.filter(legal_tutor_id=guardian[0].guardiancode) #alumnos a cargo del tutor legal
    form=PasswordChangeForm(request.user)
    formpersonaldata=personalDataChangeForm()
    users=User.objects.all()


    classrooms=[] #se van a almacenar las clases a las que pertenecen los menores a cargo del tutor legal
    userteachers=[]
    for child in children:
        classroom=Cicle.objects.filter(id=child.classroom_id) #se busca la clase en la que está el menor
        teacher=Teacher.objects.filter(id=classroom[0].teacher_id)
        teacheruser=User.objects.filter(id=teacher[0].user_id) #se busca el usuario correspondiente al tutor
        classrooms.append(classroom[0]) 
        userteachers.append(teacheruser[0])

    if request.method=='POST':
        formpersonaldata=personalDataChangeForm(request.POST)
        if formpersonaldata.is_valid():
            birthdate=request.POST['birthdate']
            phonenumber=request.POST['phonenumber']
            viatype=request.POST['viatype']
            vianame=request.POST['vianame']
            vianumber=request.POST['vianumber']
            floor=request.POST['floor']
            letter=request.POST['letter']
            cp=request.POST['cp']
            city=request.POST['city']
            iduser=request.user.id
            Guardian.objects.filter(user_id=iduser).update(birth_date=birthdate,phone=phonenumber,via_type=viatype,via_name=vianame,via_number=vianumber,address_floor=floor,floor_letter=letter,cp=cp,city=city)
            formpersonaldata=personalDataChangeForm()
            is_ok="ok"
        else:
            is_ok="not ok"
    return render(request,'users/html/userpanel.html',{'user':user[0],'guardian':guardian[0],'children':children,'userteacher':userteachers,'users':users,'classrooms':classrooms,'form':form,'formpersonaldata':formpersonaldata,"ok":is_ok})


#Vista para obtener el usuario que está registrandose cuando introduce su código de tutor
def guardianDetails(request):
    code = request.user.pk
    user=User.objects.filter(id=request.user.pk)
    guardian=Guardian.objects.filter(user_id=code)
    if guardian:
        data={
            'guardian':serialize('json',guardian),
            'user':serialize('json',user)
        }
    else:
        data={
            'guardian':"",
            'user':""
        }
    return JsonResponse(data)

def teacherDetails(request):
    id = request.user.pk
    user=User.objects.filter(id=request.user.pk)
    teacher=Teacher.objects.filter(user_id=id)
    if teacher:
        data={
            'teacher':serialize('json',teacher),
            'user':serialize('json',user)
        }
    else:
        data={
            'teacher':"",
            'user':""
        }
    return JsonResponse(data)

@login_required(login_url="login") #en caso de no estar logueado, se redirige aqui
@only_teachers
def teacherPanel(request):
    user=User.objects.filter(username=request.user)
    form=PasswordChangeForm(request.user)
    formpersonaldata=teacherPersonalDataChangeForm()
    #en caso de que el usuario sea administrador, se redirigirá al panel de administración de Django desde donde se puede 
    #administrar los elementos del sitio
    is_ok=""
    if user[0].is_superuser:
        return HttpResponseRedirect(reverse('admin:index'))
    else:
        teacher=Teacher.objects.filter(user_id=user[0].id)
        classroom=Cicle.objects.filter(teacher_id=teacher[0].id)
        alumns=Alumn.objects.filter(classroom_id=classroom[0].id)
        guardians=Guardian.objects.all()
        users=User.objects.all()
    if request.method=='POST':
        formpersonaldata=teacherPersonalDataChangeForm(request.POST)
        if formpersonaldata.is_valid():
            birthdate=request.POST['birthdate']
            viatype=request.POST['viatype']
            vianame=request.POST['vianame']
            vianumber=request.POST['vianumber']
            floor=request.POST['floor']
            letter=request.POST['letter']
            cp=request.POST['cp']
            city=request.POST['city']
            iduser=request.user.id
            Teacher.objects.filter(user_id=iduser).update(birth_date=birthdate,via_type=viatype,via_name=vianame,via_number=vianumber,address_floor=floor,floor_letter=letter,cp=cp,city=city)
            formpersonaldata=teacherPersonalDataChangeForm()
            is_ok="ok"
        else:
            is_ok="not ok"
    return render(request,'users/html/teacherpanel.html',{'user':user[0],'cicle':classroom[0],'teacher':teacher[0],'alumns':alumns,'users':users,'guardians':guardians,'form':form,'formpersonaldata':formpersonaldata,'ok':is_ok})


@login_required(login_url='login')
def teacherChangeData(request):
    iduser=request.user.pk
    form=teacherPersonalDataChangeForm()
    if request.method=="POST":
        form=teacherPersonalDataChangeForm(request.POST)
        if form.is_valid():
            birthdate=request.POST['birthdate']

            viatype=request.POST['viatype']
            vianame=request.POST['vianame']
            vianumber=request.POST['vianumber']
            floor=request.POST['floor']
            letter=request.POST['letter']
            cp=request.POST['cp']
            city=request.POST['city']
            iduser=request.user.id
            Teacher.objects.filter(user_id=iduser).update(birth_date=birthdate,via_type=viatype,via_name=vianame,via_number=vianumber,address_floor=floor,floor_letter=letter,cp=cp,city=city)
    return redirect(reverse('teacherpanel'))
    