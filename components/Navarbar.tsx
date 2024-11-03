"use client";
import React, { useState, useEffect } from "react";
import { socket } from "@/socket";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const { toast } = useToast();

  console.log("Message", message);

  useEffect(() => {
    socket.on("taskCreated", (newTask) => {
      setNotifications((count) => count + 1);
      setMessage(
        `Task "${newTask.task}" has been assigned to ${newTask.user}.`
      );
      toast({
        variant: "default",
        title: "Task Added",
        description: `Task "${newTask.task}" has been assigned to ${newTask.user}.`,
      });
      resetMessage();
    });

    socket.on("taskUpdated", (updatedTask) => {
      setNotifications((count) => count + 1);
      setMessage(`Task '${updatedTask.task}' has been updated.`);
      toast({
        title: "Task Updated",
        description: `Task '${updatedTask.task}' has been updated`,
      });
      resetMessage();
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
    };
  }, []);

  const resetMessage = () => {
    // setTimeout(() => {
    //   setMessage("");
    // }, 9000);
    if (messageVisible) {
      setMessage("");
    }
  };

  return (
    <nav className="flex   justify-between px-10 py-5 text-white font-medium bg-blue-500">
      <h1>Task Manager</h1>
      <div
        onClick={() => {
          setMessageVisible(!messageVisible);
          setNotifications(0);
        }}
        className="relative"
      >
        <Bell />
        {notifications > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform -translate-y-1/2 translate-x-1/2 bg-red-600 rounded-full">
            {notifications}
          </span>
        )}
      </div>
      {messageVisible && message && (
        <div className="absolute right-0 top-10 mr-2 mt-2 w-48 p-2 bg-white text-black text-sm rounded shadow-lg">
          {message}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
