import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Messages, Message } from "./Messages";
import { useUser } from "./UserContext";

const Room: React.FC = () => {
  const { roomName } = useParams<{ roomName: string }>();
  const location = useLocation();
  const { password } = (location.state as any) || {};
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentUserName, setCurrentUserName } = useUser();

  const navigateTo = useNavigate();

  useEffect(() => {
    // permet de sécuriser la connexion par un mot de passe
    if (!password) {
      navigateTo("/");
      return;
    }

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
      if (!messages.some((msg) => msg.timestamp === data.timestamp)) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socketInstance.onclose = () => {
      console.log("WebSocket closed");
    };

    socketInstance.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Redirection vers la page d'accueil après limite de temps atteinte
    const expirationTime = 1 * 60 * 1000; // 1 minute pour le test
    const expirationTimeout = setTimeout(() => {
      navigateTo("/");
    }, expirationTime);

    return () => {
      clearTimeout(expirationTimeout);
      socketInstance.close();
    };
  }, [roomName, password, navigateTo, messages]);

  const handleSendMessage = () => {
    if (socket && currentMessage.trim()) {
      const msg: Message = {
        message: currentMessage,
        timestamp: new Date().toISOString(),
        username: currentUserName,
      };
      console.log("Sending message:", msg);
      socket.send(JSON.stringify(msg));
      setCurrentMessage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:w-screen">
      <h1 className="text-2xl font-bold mb-4 text-slate-50">
        Chat Room: {roomName}
      </h1>
      <Messages messages={messages} currentUserName={currentUserName} />
      <div className="flex flex-row">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-3 border border-gray-300 rounded mr-5"
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#5FA9BD] text-white rounded hover:shadow-inner hover:bg-slate-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Room;
