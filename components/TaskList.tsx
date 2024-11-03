"use client";
import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { socket } from "@/socket";

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

  const filteredTasks = tasks.filter((task) =>
    statusFilter === "All" ? true : task.status === statusFilter
  );

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
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/12 p-2.5"
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Inprogress">Inprogress</option>
        <option value="Completed">Completed</option>
      </select>
      <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-3 overflow-scroll">
        {filteredTasks.map((task) => {
          console.log(`Task ID: ${task.id}`);
          return (
            <div key={task.id}>
              <TaskItem task={task} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
