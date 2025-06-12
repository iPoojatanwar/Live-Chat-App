import express from 'express';
import { allUsers, login, logout, signup } from '../Controller/userController.js';
import secureMode from '../Middlewear/secureMode.js';
const route= express.Router();
route.post("/signup",signup)
route.post("/login",login)
route.post("/logout",logout)
route.get("/allUsers",  secureMode,allUsers)
export default route;
