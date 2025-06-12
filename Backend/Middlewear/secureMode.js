import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';

const secureMode= async (req,res ,next)=>{
 const token = req.cookies.jwt
 try {
   if(!token){
    return res.status(400).json({message:"Token not found"})
   }
   const decode= jwt.verify(token,process.env.JWT_TOKEN) 
if(!decode){
    return res.status(400).json({message:" Invaild token"})
}
const user= await User.findById(decode.userId).select("-password")
    if (!user) {
        return res.status(400).json({message:"User not found"}) 
    }

    req.user=user
    next()
 } 
 catch (error) {
    console.log("error in secure mode",error)
    return res.status(500).json({message:"Internat serve error"})
 }   
}
export default secureMode