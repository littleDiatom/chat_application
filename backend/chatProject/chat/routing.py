from django.urls import re_path
from . import consumers
from channels.routing import ProtocolTypeRouter, URLRouter


websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<room_name>\w+)/room$", consumers.ChatConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    'websocket':
        URLRouter(
            websocket_urlpatterns
        )
    ,
})