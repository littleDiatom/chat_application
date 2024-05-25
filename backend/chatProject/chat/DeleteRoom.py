from django_cron import CronJobBase, Schedule
from django.utils import timezone
from .models import Room

# fonction pour nettoyer régulièrement les salles expirées
class CleanupExpiredRooms(CronJobBase):
    RUN_EVERY_MINS = 1  #période d'expiration

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'chat.cleanup_expired_rooms' 

    def do(self):
        now = timezone.now()
        Room.objects.filter(expiration_time__lte=now).delete()
