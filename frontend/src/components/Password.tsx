import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const Chat: React.FC = () => {
  const { roomName } = useParams<{ roomName: string }>();

  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigateTo = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const { setCurrentUserName } = useUser();

  const handleSetPassword = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/chat/${roomName}/`,
        {
          password: password,
        }
      );
      setMessage(response.data.message);
      setCurrentUserName(userName);
      navigateTo(`/chat/${roomName}/room`, {
        state: { password },
      });
    } catch (error) {
      setMessage("Error setting password");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center md:h-fit mt-10 mx-auto max-w-md rounded overflow-hidden shadow-lg bg-gray-50 bg-opacity-30">
      <p className="text-semibold mt-2 text-slate-50 text-center mb-5">
        You can invite your friends by sharing the following room ID with your
        personal password: {roomName}
      </p>
      <p className="text-semibold mt-2 text-slate-50 text-center">
        First, set a password:
      </p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-80 mt-1 mb-3 shadow-sm rounded-md"
      />
      <p className="text-semibold mt-2 text-slate-50 text-center">
        Choose a username:
      </p>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter Username"
        className="w-80 mt-1 mb-3 shadow-sm rounded-md"
      />
      <button
        onClick={handleSetPassword}
        className="shadow-md rounded-md hover:bg-gradient-to-r from-[#265865] to-[#5FA9BD]  hover:text-slate-50 mb-5 mt-5"
      >
        Set Password
      </button>
      <p>{message}</p>
    </section>
  );
};

export default Chat;
