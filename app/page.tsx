import { AddModal } from "@/components/AddModal";

import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/task");

  const data = await res.json();
  console.log("home", data);
  return (
    <div className="mx-10 h-screen ">
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg text-gray-500">Tasks</h1>
        {/* <Button className="bg-blue-500 hover:bg-blue-600">Create Task</Button> */}
        <AddModal />
      </div>
      <div className="">
        <TaskList data={data} />
      </div>
    </div>
  );
}
