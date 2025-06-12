const Messages = ({ message }) => {
  const storedUser = localStorage.getItem('Chatapp');
  const authUser = storedUser ? JSON.parse(storedUser) : null;

  const senderId = typeof message.sender === 'string' ? message.sender : message.sender?._id;

  const userId = authUser?.user?._id || authUser?._id;

  const itsMe = senderId && userId && senderId === userId;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500 text-white" : "bg-gray-500 text-black";

  return (
    <div className='p-4'>
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble ${chatColor}`}>
          {message.message}
        </div>
      </div>
    </div>
  );
};
export default Messages;
