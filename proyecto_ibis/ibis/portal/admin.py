from django.contrib import admin
from .models import *

class readOnly(admin.ModelAdmin):
    readonly_fields=("created_at","updated_at")
# Register your models here.
admin.site.register(Event,readOnly)
admin.site.register(New,readOnly)
admin.site.register(Timetable,readOnly)
admin.site.register(Menu,readOnly)


