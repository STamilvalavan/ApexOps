from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'bike_name', 'bike_model', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (
        ('Bike Info', {'fields': ('bike_name', 'bike_model')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Bike Info', {'fields': ('bike_name', 'bike_model')}),
    )
