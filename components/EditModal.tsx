"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { socket } from "@/socket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function EditModal({ id, setIsOpen }: any) {
  const [task, setTask] = useState("");
  const [user, setUser] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  console.log("ID", id);

  console.log(task, user, dueDate, priority);

  useEffect(() => {
    async function fetchUser() {
      if (id) {
        const res = await fetch(`http://localhost:3000/api/task/${id}`);
        const data = await res.json();
        console.log("Edit", data);

        // Populate each state field individually
        setTask(data.task || "");
        setUser(data.user || "");
        setPriority(data.priority || "");
        setDueDate(data.dueDate || "");
        setStatus(data.status || "");
      }
    }
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedTaskData = {
      task,
      user,
      priority,
      dueDate,
      status,
    };

    const response = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTaskData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      socket.emit("taskUpdated", data);
      setIsOpen(false);
      router.push("/");
    }
  };

  return (
    <DialogContent className="sm:max-w-[495px]">
      <DialogHeader>
        <DialogTitle>Update Task</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Task Title
          </label>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder=""
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Assign Task To:
          </label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder=""
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Task Due Date
          </label>
          <input
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Enter PhoneNo"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="">--Select an option--</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="">--Select an option--</option>
            <option value="Inprogress">InProgress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
    </DialogContent>
  );
}
