import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';
export const jwtCookieToken= (userId , res)=>{
    const token= jwt.sign({userId},process.env.JWT_TOKEN ,{
        expiresIn:"1d"
    })
    res.cookie("jwt",token,{
httpOnly:true,
secure:true,
sameSite:"none",
    })
    return token

 }
 