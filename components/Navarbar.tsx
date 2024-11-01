import { Bell } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex  justify-between px-10 py-5 text-white font-medium bg-blue-500">
      <h1>Task Manager</h1>
      <Bell />
    </nav>
  );
};

export default Navbar;
