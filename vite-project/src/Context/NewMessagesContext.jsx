import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../Zustand/useConversation'

const NewMessagesContext = () => {
    const {socket}=useSocketContext()
    const {  messages ,setMessage}=useConversation()
    useEffect(()=>{
     socket.on("newMessage",(newMessage)=>{
       const audio = new Audio('/sound/notification.mp3');
audio.play();
setMessage( [...messages, newMessage])
     })
     return()=>{
        socket.off("newMessage")
     }   
    },[ socket ,messages,setMessage])
 
}
export default NewMessagesContext