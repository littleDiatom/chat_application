// src/components/Room.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Room.css"; // Assurez-vous d'avoir un fichier CSS pour les styles spécifiques

interface Message {
  message: string;
  pseudo: string;
  color: string;
  timestamp: string;
  userId: string; // Ajoutez un identifiant unique pour l'utilisateur
}

const Room: React.FC = () => {
  const { roomName } = useParams<{ roomName: string }>();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pseudo, setPseudo] = useState("User");
  const [color, setColor] = useState("#000000");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socketInstance = new WebSocket(
      `ws://localhost:8000/ws/chat/${roomName}/room`
    );
    setSocket(socketInstance);

    socketInstance.onopen = () => {
      console.log("WebSocket connected");
    };

    socketInstance.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socketInstance.onclose = () => {
      console.log("WebSocket closed");
    };

    socketInstance.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socketInstance.close();
    };
  }, [roomName]);

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      const msg = {
        message: message,
        pseudo: pseudo,
        color: color,
      };
      console.log("Sending message:", msg);
      socket.send(JSON.stringify(msg));
      setMessage("");
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-50">
        Chat Room: {roomName}
      </h1>
      <div className="h-96 bg-white border border-gray-300 rounded p-4 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-2 mb-2 rounded"
            style={{ color: msg.color }}
          >
            <strong>{msg.pseudo}</strong> [{formatDate(msg.timestamp)}]:{" "}
            {msg.message}
          </div>
        ))}
      </div>
      {/* Paramètre utilisateur (pseudo, couleur) */}
      <div className="mb-4 mt-4 flex flex-row ">
        <p className="text-slate-50 mr-3">Choose a username</p>
        <input
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Pseudo"
          className="mr-2 p-1 border border-gray-300 rounded-md"
        />
        <p className="text-slate-50 mr-3">and a color</p>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          title="Choose your color"
          className="border-gray-300 rounded-md border"
        />
      </div>
      <div className="flex flex-row">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-3 border border-gray-300 rounded mr-5"
        />
        <button
          onClick={handleSendMessage}
          className=" bg-[#5FA9BD] text-white rounded hover:shadow-inner hover:bg-slate-700	"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Room;
