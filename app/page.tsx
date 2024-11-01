import { AddModal } from "@/components/AddModal";
import TaskItem from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-10 h-screen bg-gray-400">
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg text-gray-500">Tasks</h1>
        {/* <Button className="bg-blue-500 hover:bg-blue-600">Create Task</Button> */}
        <AddModal />
      </div>
      <div className="grid grid-cols-3">
        <TaskItem />
      </div>
    </div>
  );
}
