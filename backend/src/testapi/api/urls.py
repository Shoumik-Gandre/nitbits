from django.urls import path
from .views import getnumgivestr

urlpatterns = [
    path('<int:num>/', getnumgivestr),
]