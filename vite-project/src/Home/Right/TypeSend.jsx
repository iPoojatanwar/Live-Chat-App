
import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import useSendChat from './SendChat'; 

function TypeSend() {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='bg-gray-900 p-3 w-full flex space-x-2 '>
        <input
          type="text"
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input bg-black p-6 w-[50%] focus:outline-none  "
        />
        <button type="submit" className='text-[30px]' disabled={loading}>
          <IoSend />
        </button>
      </div>
    </form>
  );
}

export default TypeSend;