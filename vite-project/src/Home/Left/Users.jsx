import React from 'react';
import useConversation from '../../Zustand/useConversation';
import { useSocketContext } from '../../Context/SocketContext';


const Users = ({ users }) => {
  const {selectedConversation , setSelectedConversation }=useConversation()
  const{socket, onlineUsers}=useSocketContext();
const isSelected = selectedConversation?._id ===  users?._id;
   const userIdStr = users._id.toString();


  const isOnline = onlineUsers.some(id => id.toString() === userIdStr);


  return (
    <div className={`flex space-x-2 text-align-center w-[100%] hover:bg-slate-600 duration-800 ${isSelected?"bg-slate-700":""}`}
    onClick={()=>setSelectedConversation(users)}
    >
      <div
        className={'w-[100%] flex space-x-2 p-2 cursor-pointer hover:bg-gray-900 '}
        
      >
        <div className={`avatar ${isOnline ? ' avatar-online' : ''}`}>
          <div className="w-18 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/distracted3@192.webp" alt="User Avatar" />
          </div>
        </div>
        <span>
          <h2>{users.fullname}</h2>
          <h4>{users.email}</h4>
        </span>
      </div>
    </div>
  );
};

export default Users;
