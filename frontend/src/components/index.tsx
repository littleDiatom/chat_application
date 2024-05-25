// src/components/Index.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ApiResponse {
  room_name: string;
  message: string;
}

const Index: React.FC = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigateTo = useNavigate();

  const handleCreateRoom = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://localhost:8000/api/"
      );
      setRoomName(response.data.room_name);
      setMessage("Room created successfully");
      navigateTo(`/chat/${response.data.room_name}`);
    } catch (error) {
      setMessage("Error creating room");
    }
  };

  const handleAccessRoom = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:8000/api/",
        {
          room_name: roomName,
          password: password,
        }
      );
      if (response.status === 200) {
        navigateTo(`/chat/${response.data.room_name}/room`, {
          state: { password },
        });
      }
    } catch (error) {
      setMessage("Error accessing room");
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center  mt-10 mx-auto max-w-md rounded overflow-hidden shadow-lg bg-gray-50 bg-opacity-30	 ">
        <div className="">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* creation d'une salle */}
            <div className="flex flex-row justify-start mb-5">
              <p className="text-semibold mt-2 text-slate-50">
                Do you want to{" "}
              </p>
              <button
                className="hover:bg-gradient-to-r from-[#265865] to-[#5FA9BD] hover:text-slate-50 ml-5 shadow-md"
                onClick={handleCreateRoom}
              >
                Create a Room
              </button>
            </div>

            {/* Accès à une salle existante*/}
            <div className="mt-5 flex flex-col">
              <p className="mb-2 text-slate-50">
                Or access an existing room, using a room name and a password?{" "}
              </p>
              <input
                type="text"
                value={roomName}
                onChange={(e: any) => setRoomName(e.target.value)}
                placeholder="Room Name"
                className="w-full mt-1 mb-3 shadow-sm rounded-md"
              />
              <input
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-5 rounded-md"
              />
              <button
                onClick={handleAccessRoom}
                className="shadow-md rounded-md hover:bg-gradient-to-r from-[#265865] to-[#5FA9BD]  hover:text-slate-50"
              >
                Access Room
              </button>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
