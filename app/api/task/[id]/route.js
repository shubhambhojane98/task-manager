import { tasks } from "@/helper/data";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;
  const { task, user, dueDate, priority, status } = await req.json();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return NextResponse.json(
      { error: "User not found" },
      {
        status: 404,
      }
    );
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    task,
    user,
    dueDate,
    priority,
    status,
  };

  return NextResponse.json(tasks[taskIndex], {
    status: 200,
  });
}

export async function GET(request, { params }) {
  const { id } = await params;
  console.log("ID", id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(task, { status: 200 });
}
