from django.db import models
from django.utils import timezone
from datetime import timedelta


'''
Définition d'un modèle de salle comprenant un temps limite d'utilisation
    - fonction 'save' : permet de définir ce temps d'expiration (par défaut = 10 min)
'''
class Room(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=128, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expiration_time = models.DateTimeField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if not self.expiration_time:
            self.expiration_time = timezone.now() + timedelta(minutes=1)
        super().save(*args, **kwargs)

    
    def __str__(self):
        return self.name

