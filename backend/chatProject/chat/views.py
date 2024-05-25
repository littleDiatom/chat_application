from django.shortcuts import render, redirect
from django.utils import timezone
import shortuuid
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Room
from django.contrib.auth.hashers import make_password, check_password


# fonction d'authentification pour sécuriser l'accès aux salles
def authenticate(roomName=None, roomPassword=None):
    try:
        room = Room.objects.get(name=roomName)
        if check_password(roomPassword, room.password):
            return room
        return None
    except Room.DoesNotExist:
        return None
    
    
#Vues pour la page index
'''
    - GET : creation d'une salle
    - POST : accès à une salle existente
'''
class IndexView(APIView):
    def get(self, request):
        try:
            room_name = str(shortuuid.uuid())
            return Response({
                "room_name": room_name,
                "message": "success"
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "message": "error",
                "details": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            room_name = request.data.get('room_name')
            room_password = request.data.get('password')
            if not room_name:
                return Response({
                    "message": "Room name is required"
                }, status=status.HTTP_400_BAD_REQUEST)
            if not room_password:
                return Response({
                    "message": "Password is required"
                }, status=status.HTTP_400_BAD_REQUEST)

            room = authenticate(roomName=room_name, roomPassword=room_password)
            if room:
                if timezone.now() > room.expiration_time:
                    room.delete()
                    return Response({
                        "message": "Room expired"
                    }, status=status.HTTP_410_GONE)
                return Response({
                    "room_name": room_name,
                    "message": "success"
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "message": "Invalid credentials"
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                "message": "error",
                "details": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
        
        
    
#Vues pour la page chat
'''
    - POST : création d'un mot de passe
'''
class ChatView(APIView):        
    def post(self, request, room_name):
        try:
            room_password = request.data.get('password')
            if not room_password:
                return Response({
                    "message": "Password is required"
                }, status=status.HTTP_400_BAD_REQUEST)

            hashed_password = make_password(room_password)
            room = Room(name=room_name, password=hashed_password)
            room.save()
            return Response({
                "room_name": room_name,
                "message": "success"
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "message": "error",
                "details": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Vues pour la page room
'''
    - GET : renvoie simplement le nom de la room
'''
class RoomView(APIView):
    def get(self, request, room_name):
        try:
            room = Room.objects.get(name=room_name)
            if timezone.now() > room.expiration_time:
                room.delete()
                return Response({
                    "message": "Room expired"
                }, status=status.HTTP_410_GONE)

            return Response({
                "room_name": room_name,
                "message": "success"
            }, status=status.HTTP_200_OK)
        except Room.DoesNotExist:
            return Response({
                "message": "Room not found"
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "message": "error",
                "details": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)