"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { FilePenLine, Trash } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { EditModal } from "./EditModal";

interface Task {
  id: string;
  task: string;
  user: string;
  dueDate: string;
  priority: any;
  status: any;
}

interface Tasks {
  task: Task;
  handleDelete: (id: string) => Promise<void>;
}

const TaskItem = ({ task, handleDelete }: Tasks) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className=" min-h-40 rounded-sm shadow-sm border hover:bg-slate-50">
      <CardContent className="flex flex-col p-4 ">
        <div className="flex justify-between">
          <p
            className={`${
              task.priority === "High"
                ? "text-red-500"
                : task.priority === "Low"
                ? "text-yellow-500"
                : "text-green-500"
            } mb-2`}
          >
            {task.priority} Priority
          </p>
          <div className="flex gap-3">
            <Trash
              onClick={() => handleDelete(task.id)}
              className="hover:text-red-500"
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <FilePenLine
                  className="hover:text-blue-500"
                  onClick={() => setIsOpen(true)}
                />
              </DialogTrigger>
              <EditModal
                setIsOpen={(args: any) => setIsOpen(args)}
                id={task.id}
              />
            </Dialog>
          </div>
        </div>
        <h1 className="mb-2">Task : {task.task}</h1>
        <p className="mb-2">User : {task.user}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm md:text-base">Due date : {task.dueDate}</p>
          <span
            className={`${
              task.status === "Pending"
                ? "bg-red-200 text-red-800"
                : task.status === "Inprogress"
                ? "bg-yellow-100 text-yellow-500"
                : "bg-green-100 text-green-600"
            }text-xs font-medium me-2 px-2.5 py-0.5 rounded `}
          >
            {task.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
