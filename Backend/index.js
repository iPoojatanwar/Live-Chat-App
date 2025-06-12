import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import route from "./Router/userRouter.js";
import messageRoute from "./Router/messageRoute.js";
import { app, httpServer } from "./SocketIo/SocketIo.js";


dotenv.config()
app.use(cookieParser())
app.use(cors({
   origin:'http://localhost:5173',
   credentials:true
}))
app.use(express.json())
 const PORT= process.env.PORT || 4002

 const MONGODB_URL= process.env.MONGODB_URL 
 try {
 mongoose.connect(MONGODB_URL);
    console.log("Database connect successful")
 } catch (error) {
    console.log(error)
 }

 app.use("/api/user",route)
 app.use('/api/message',messageRoute )
 app.get("/" , (req ,res)=>{
res.send("welcome in nodemon data")
 })
 
 httpServer.listen(PORT, ()=>{
  console.log(  ` The server  start one the ${PORT}`);
 })