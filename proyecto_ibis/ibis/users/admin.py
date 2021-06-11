from django.contrib import admin
from .models import *

class readOnlyGuardian(admin.ModelAdmin):
    readonly_fields=("privacity","terms","newsletter")

# Register your models here.
admin.site.register(Guardian,readOnlyGuardian)
admin.site.register(Teacher)
admin.site.register(Alumn)
admin.site.register(Cicle)


