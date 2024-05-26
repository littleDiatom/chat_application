import React, { useEffect, useRef } from "react";

export interface Message {
  message: string;
  username: string;
  timestamp: string;
  color: string;
}

interface MessagesProps {
  messages: Message[];
  currentUserName: string;
}

export const Messages: React.FC<MessagesProps> = ({
  messages,
  currentUserName,
}) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-96 bg-white rounded-md p-4 overflow-y-auto mb-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex mb-2 ${
            msg.username === currentUserName ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-2 rounded-[15px] min-w-[40%] ${
              msg.username === currentUserName
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            <div className="flex flex-row flex-start mb-2">
              <strong className="mr-3">{msg.username}</strong>
              <p className="">{formatDate(msg.timestamp)}</p>
            </div>
            {msg.message}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
