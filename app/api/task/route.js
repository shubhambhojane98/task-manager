import { NextResponse } from "next/server";

import { tasks } from "@/helper/data";

// let tasks = [];

// function emitTaskEvent(event, task) {
//   if (io) io.emit(event, task);
// }

export async function GET(req) {
  return NextResponse.json(tasks, { status: 200 });
}

export async function POST(req) {
  try {
    const { task, user, dueDate, priority } = await req.json();
    const newTask = {
      id: Date.now().toString(),
      task,
      user,
      dueDate,
      priority,
      status: "Pending",
    };
    console.log(newTask);
    tasks.push(newTask);

    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    console.error("Error handling task creation:", error);
  }
}
