import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:['http://localhost:5173', 'https://live-chat-app-bay.vercel.app'],
    methods: ["GET", "POST"],
    credentials:true,
  },
});
 
export const getNewSocketId=(receiverId)=>{
 return users[receiverId]
}

const users = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected:", userId, socket.id);

  if (userId) {
    if (!users[userId]) {
      users[userId] = [];
    }
    users[userId].push(socket.id);
  }


  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId, socket.id);
    if (userId ) {
      
      
      
        delete users[userId];
      
    }
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, httpServer };
