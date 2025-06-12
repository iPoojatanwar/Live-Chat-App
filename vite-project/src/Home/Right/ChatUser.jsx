import React from 'react'
import useConversation from '../../Zustand/useConversation'
import { useSocketContext } from '../../Context/SocketContext'

const ChatUser = () => {
  const  { selectedConversation}=useConversation()
  const {socket, onlineUsers }=useSocketContext()
  const userId= selectedConversation._id.toString();
 const isOnline = onlineUsers.some(id => id.toString() === userId);


  return (
   <>
    <div className='bg-gray-900 flex items-center justify-center space-x-2 py-2'>
    <div className={`avatar ${isOnline ? ' avatar-online' : ''}`}>
  <div className="w-18 rounded-full">
  <img src="https://img.daisyui.com/images/profile/demo/distracted3@192.webp" />
  </div>
</div>
<span>
    <h2>{selectedConversation.fullname}</h2>
    <h4> {selectedConversation.email}</h4>
</span>
    </div>
   </>
  )
}

export default ChatUser