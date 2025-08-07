import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import route from "./Router/userRouter.js";
import messageRoute from "./Router/messageRoute.js";
import { app, httpServer } from "./SocketIo/SocketIo.js";

dotenv.config();

app.use(cookieParser());

const allOrigin = [
  'http://localhost:5173',
  'https://live-chat-app-bay.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not Allow CORS'));
    }
  },
  credentials: true 
}));

app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database connect successful");

    app.use("/api/user", route);
    app.use('/api/message', messageRoute);

    app.get("/", (req, res) => {
      res.send("welcome in nodemon data");
    });

    httpServer.listen(PORT, () => {
      console.log(`The server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

startServer();
