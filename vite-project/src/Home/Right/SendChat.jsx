
import { useState } from 'react';
import axios from 'axios';
import useConversation from '../../Zustand/useConversation';

const useSendChat = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessage = async (newMessage) => {
    if (!selectedConversation?._id || !newMessage.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(`/api/message/send/${selectedConversation._id}`, {
        message: newMessage,
      });

      
      setMessage([...messages, res.data.newMessage]);
    } catch (error) {
      console.error("Send message failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendChat;
