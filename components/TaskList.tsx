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

  useEffect(() => {
    const handleTaskCreated = (newTask: any) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    socket.on("taskCreated", handleTaskCreated);

    return () => {
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
    <div className="grid grid-cols-1 gap-2 m-2 md:grid-cols-3">
      {tasks.map((task) => {
        console.log(`Task ID: ${task.id}`);
        return (
          <div key={task.id}>
            <TaskItem task={task} />
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
