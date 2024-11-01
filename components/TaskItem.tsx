import React from "react";
import { Card, CardContent } from "./ui/card";
import { FilePenLine } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { EditModal } from "./EditModal";

const TaskItem = () => {
  let priority = "Low";
  return (
    <Card className=" min-h-40 rounded-sm shadow-sm border hover:bg-slate-50">
      <CardContent className="flex flex-col p-4 ">
        <div className="flex justify-between">
          <p
            className={`${
              priority === "High"
                ? "text-red-500"
                : priority === "Low"
                ? "text-yellow-500"
                : "text-green-500"
            } mb-2`}
          >
            {priority} Priority
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <FilePenLine />
            </DialogTrigger>
            <EditModal />
          </Dialog>
        </div>
        <h1 className="mb-2">Fix the hardware issue</h1>
        <p className="mb-2">Techncian : Shubham</p>
        <div className="flex items-center justify-between">
          <p className="">Due date : 10/10/2024</p>
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
            Inprogress
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
