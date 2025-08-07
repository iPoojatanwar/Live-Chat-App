import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://live-chat-app-bay.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {};

export const getNewSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (!userId || typeof userId !== "string") {
    console.log("Socket connected without valid userId");
    return;
  }

  console.log("User connected:", userId, socket.id);

  if (!users[userId]) {
    users[userId] = [];
  }
  users[userId].push(socket.id);

  // Emit updated online users list to all clients
  io.emit("getOnlineUsers", Object.keys(users));
  console.log("Current online users:", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId, socket.id);

    if (users[userId]) {
      // Remove disconnected socket from user's socket list
      users[userId] = users[userId].filter((id) => id !== socket.id);

      // If no more sockets left, delete the user
      if (users[userId].length === 0) {
        delete users[userId];
      }
    }

    // Emit updated online users list after disconnect
    io.emit("getOnlineUsers", Object.keys(users));
    console.log("Current online users after disconnect:", Object.keys(users));
  });
});

export { app, io, httpServer };
