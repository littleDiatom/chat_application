import json
from channels.generic.websocket import AsyncWebsocketConsumer
from datetime import datetime, timezone

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        print(f"WebSocket connected: {self.channel_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print(f"WebSocket disconnected: {self.channel_name}")

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        pseudo = text_data_json['pseudo']
        color = text_data_json['color']
        timestamp = datetime.now(timezone.utc).isoformat()

        print(f"Message received: {message}")

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'pseudo': pseudo,
                'color': color,
                'timestamp': timestamp,
            }
        )

    async def chat_message(self, event):
        message = event['message']
        pseudo = event['pseudo']
        color = event['color']
        timestamp = event['timestamp']

        print(f"Sending message: {message}")

        await self.send(text_data=json.dumps({
            'message': message,
            'pseudo': pseudo,
            'color': color,
            'timestamp': timestamp,
        }))
