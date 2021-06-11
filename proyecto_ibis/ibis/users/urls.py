#Este archivo URL es solo válido para la aplicación en la que está, en este caso Users
from django.urls import path
from users import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [
#Mis URL
# path('', views.login, name="userschange"),
path('login/', auth_views.LoginView.as_view(), name='login'),#si no se está logueado que se loguee
path('logout/', auth_views.LogoutView.as_view(), name='logout'),
path('register/',views.register,name="register"),
path('guardiandetails/',views.guardianDetails,name="guardiandetails"),
path('teacherdetails/',views.teacherDetails,name="teacherdetails"),
path('userpanel/',views.guardianPanel,name="userpanel"),
path('changefirstpassword/',views.changeFirstPassword,name="changefirstpassword"),
path('teacherpanel/',views.teacherPanel,name="teacherpanel"),
path('changeteacherdata/',views.teacherChangeData,name="changeteacherdata"),
path('changepasswordteacher/',views.changePasswordTeacher,name="changepasswordteacher"),
path('changepasswordguardian/',views.changePasswordGuardian,name="changepasswordguardian")

]
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)



