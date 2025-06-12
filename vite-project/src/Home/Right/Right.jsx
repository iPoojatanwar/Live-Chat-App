import React from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import TypeSend from './TypeSend'
import AllMessages from './AllMessages'
import useConversation from '../../Zustand/useConversation'
import { CiMenuFries } from "react-icons/ci";
import NewMessagesContext from '../../Context/NewMessagesContext'

const Right = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full">
    
      <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden absolute left-2 z-10">
        <CiMenuFries className="text-white" title="Open Menu" />
      </label>

      <div className="bg-gray-800 h-screen flex flex-col justify-between">
        {!selectedConversation ? (
          <div className="flex flex-1 items-center justify-center p-4 text-white text-center">
            No conversation is currently selected. To get started, please choose a contact from your chat list.
          </div>
        ) : (
          <>
            <NewMessagesContext />

        
            <div className="bg-gray-900 border-b border-gray-700 p-2">
              <ChatUser />
            </div>

  
            <AllMessages />

            
            <div className="bg-gray-900 border-t border-gray-700 p-2">
              <TypeSend />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Right;
