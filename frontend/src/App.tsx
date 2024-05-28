// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/index";
import Chat from "./components/Password";
import Room from "./components/Room";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import { UserProvider } from "./components/UserContext";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="h-screen bg-[url('./assets/jeremy-bishop-G9i_plbfDgk-unsplash.jpg')] bg-cover bg-center w-screen">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat/:roomName" element={<Chat />} />
            <Route path="/chat/:roomName/room" element={<Room />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
};

export default App;
