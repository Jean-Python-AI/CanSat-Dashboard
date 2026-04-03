"""
API URL routing.
"""
from django.urls import path, include
from DATA_API.views.views import showData

urlpatterns = [
    path("view/", showData, name="showData"),
    path("", include("DATA_API.api.urls")),
]
