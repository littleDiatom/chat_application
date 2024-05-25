// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/index";
import Chat from "./components/Password";
import Room from "./components/Room";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
  return (
    <div className="h-screen bg-[url('./assets/jeremy-bishop-G9i_plbfDgk-unsplash.jpg')] bg-cover bg-center">
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
  );
};

export default App;
