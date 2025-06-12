import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const CreateSocketIo = createContext();
export const useSocketContext=()=>{
 return useContext(CreateSocketIo);
}
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userAuth] = useAuth();

  useEffect(() => {
    if (!userAuth?.user?._id) return;

    const newSocket = io("http://localhost:4000", {
      query: {
        userId: userAuth.user._id,
      },
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (users) => {
      
      setOnlineUsers(users);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [userAuth]);

  return (
    <CreateSocketIo.Provider value={{socket, onlineUsers}}>
      {children}
    </CreateSocketIo.Provider>
  );
};

export default CreateSocketIo;
