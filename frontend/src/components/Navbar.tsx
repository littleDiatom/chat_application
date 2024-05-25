import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="md:w-screen flex flex-row justify-between p-5 bg-[#001015]">
      <p className="text-1xl font-extrabold text-[#5FA9BD]">My chat room</p>
      <div className="flex flex-row justify-between">
        <Link
          to="/"
          className="text-slate-50 text-1xl text-semibold hover:text-[#5FA9BD] m-auto "
        >
          Home
        </Link>
      </div>
    </nav>
  );
}
