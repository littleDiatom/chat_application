from django.contrib import admin
from django.urls import path
from chat.views import IndexView, ChatView, RoomView

urlpatterns = [
    path('api/', IndexView.as_view(), name='index'),
    path('api/chat/<str:room_name>/', ChatView.as_view(), name='password'),
    path('api/chat/<str:room_name>/room/', RoomView.as_view(), name='chatRoom'),
]



