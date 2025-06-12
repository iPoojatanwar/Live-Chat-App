import { useEffect, useState } from 'react';
import useConversation from '../Zustand/useConversation';
import axios from 'axios';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      if (!selectedConversation || !selectedConversation._id) return;

      setLoading(true); 

      const storedData = localStorage.getItem("Chatapp");
      const parsed = storedData ? JSON.parse(storedData) : null;
      const token = parsed?.token;

      
      if (!token) {
        console.error("Token is missing. Please log in first.");
        const senderId = user._id.toString();
const receiverId = selectedUser._id.toString();
        const conversationId = senderId > receiverId ? `${senderId}${receiverId}` : `${receiverId}${senderId}`;
        

       
        return;
      }

      try {
       

        const res = await axios.get(`/api/message/get/${selectedConversation._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, 
        });

        
        
        setMessage(res.data);

      } catch (error) {
        console.log("Error fetching messages:", error);
      } finally {
        setLoading(false); 
      }
    };

    getMessage();
    
   

  }, [selectedConversation, setMessage]);

  return [loading, messages];
};

export default useGetMessages;
