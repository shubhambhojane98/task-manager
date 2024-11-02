import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let io;

app.prepare().then(() => {
  const httpServer = createServer(handler);

  io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("taskCreated", (task) => {
      console.log("New task created", task);
      io.emit("taskCreated", task);
    });

    socket.on("taskUpdated", (updatedTask) => {
      console.log("Task updated", updatedTask);
      io.emit("taskUpdated", updatedTask);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

export { io };
