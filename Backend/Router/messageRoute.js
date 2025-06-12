import express from 'express'
import {getMessages, sendMessage} from '../Controller/sendMessage.js'
import secureMode from '../Middlewear/secureMode.js'


const messageRoute = express.Router()
messageRoute.post("/send/:id",secureMode,sendMessage)
messageRoute.get("/get/:id",secureMode,getMessages)
export default messageRoute