import React from "react";
import { Card, CardContent } from "./ui/card";
import { FilePenLine } from "lucide-react";
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
}

const TaskItem = ({ task }: Tasks) => {
  let priority = "Low";
  return (
    <Card className=" min-h-40 rounded-sm shadow-sm border hover:bg-slate-50">
      <CardContent className="flex flex-col p-4 ">
        <div className="flex justify-between">
          <p
            className={`${
              task.priority === "high"
                ? "text-red-500"
                : task.priority === "low"
                ? "text-yellow-500"
                : "text-green-500"
            } mb-2`}
          >
            {task.priority} Priority
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <FilePenLine />
            </DialogTrigger>
            <EditModal />
          </Dialog>
        </div>
        <h1 className="mb-2">{task.task}</h1>
        <p className="mb-2">Techncian : {task.user}</p>
        <div className="flex items-center justify-between">
          <p className="">Due date : {task.dueDate}</p>
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
            {task.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
