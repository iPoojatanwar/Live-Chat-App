import Conversation from "../Model/conversationModel.js";
import Message from "../Model/messageModel.js";  
import mongoose from "mongoose";
import { getNewSocketId, io } from "../SocketIo/SocketIo.js";

 export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("Receiver ID:", receiverId);
    console.log("Sender ID:", senderId);
    console.log("Message content:", message);

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      sender: senderId,  
      receiver: receiverId, 
      message,
    });

    
 
conversation.save()
    if(newMessage)
   { conversation.messages.push(newMessage._id);
}
   
   newMessage.save()

    const receiverSocketId=getNewSocketId(receiverId)
    if(receiverSocketId){
     io.to(receiverSocketId).emit("newMessage",newMessage)
    }
    return res.status(200).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.log("Error in sendMessage controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getMessages = async (req, res) => {
  try {
    const { id: chatUserId } = req.params;
    const senderId = req.user._id;
    
    console.log("Get messages called");
    console.log("Sender ID:", senderId);
    console.log("Chat User ID:", chatUserId);
    
   
    const conversation = await Conversation.findOne({
      $or: [

        { members: { $all: [senderId, new mongoose.Types.ObjectId(chatUserId)] } },
        { members: { $all: [senderId.toString(), chatUserId] } },
        { members: { $all: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(chatUserId)] } }
      ]
    }).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "fullname email"
      }
    });
    
    if (!conversation) {
      console.log("No conversation found - creating one");
      
     
      const newConversation = new Conversation({
        members: [senderId, new mongoose.Types.ObjectId(chatUserId)],
        messages: []
      });
      
      try {
        await newConversation.save();
        console.log("New conversation created");
      } catch (err) {
        console.error("Failed to create conversation:", err);
      }
      
  
      return res.status(200).json([]);
    }
    
    console.log("Conversation found with", conversation.messages.length, "messages");
   
    return res.status(200).json(conversation.messages || []);
    
  } catch (error) {
    console.error("Error in getMessages controller:", error);

    return res.status(200).json([]);
  }
};