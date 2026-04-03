"""
Django admin configuration.
"""
from django.contrib import admin
from DATA_API.models import Launch, Data


@admin.register(Launch)
class LaunchAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at", "is_recording")
    list_filter = ("is_recording", "created_at")
    search_fields = ("name",)
    readonly_fields = ("created_at",)


@admin.register(Data)
class DataAdmin(admin.ModelAdmin):
    list_display = ("id", "launch", "time", "altitude", "temperature", "created_at")
    list_filter = ("launch", "created_at")
    search_fields = ("launch__name",)
    readonly_fields = ("created_at",)
