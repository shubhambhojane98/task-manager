"use client";
import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  task: string;
  user: string;
  dueDate: string;
  priority: any;
  status: any;
}

interface TaskList {
  data: Task[];
}

const TaskList = ({ data }: TaskList) => {
  const [tasks, setTasks] = useState(data || []);
  const [statusFilter, setStatusFilter] = useState("All");
  const router = useRouter();

  const filteredTasks = tasks.filter((task) =>
    statusFilter === "All" ? true : task.status === statusFilter
  );

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting task");
      }

      // Update the local user list to reflect the deletion
      setTasks(tasks.filter((task) => task.id !== id));
      alert("User deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    const handleTaskCreated = (newTask: any) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask: any) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    };
    socket.on("taskCreated", handleTaskCreated);
    socket.on("taskUpdated", handleTaskUpdated);

    return () => {
      socket.off("taskCreated", handleTaskCreated);
      socket.off("taskCreated", handleTaskCreated);
    };
  }, []);

  console.log("T", tasks);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <div className="">
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-3/4 mt-2 md:w-2/12 p-2.5"
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Inprogress">Inprogress</option>
        <option value="Completed">Completed</option>
      </select>
      <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-3 ">
        {filteredTasks.map((task) => {
          console.log(`Task ID: ${task.id}`);
          return (
            <div key={task.id}>
              <TaskItem
                handleDelete={(id: string) => handleDelete(id)}
                task={task}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
