import { jwtCookieToken } from "../JWT/Autherization.js"
import User from "../Model/userModel.js"
import bcrypt from 'bcrypt'
 export const signup=async (req ,res)=>{
   const {fullname,email,password, confirmpassword}=req.body
  try {
    if (!fullname||!email||!password||!confirmpassword) {
         return res.status(400).json({message:"All fields are reqired"})
       }
    if(password!==confirmpassword){
       return res.status(400).json({message:"Password and confirm  password are not matched"})
    }
       const user= await User.findOne({email})
       if(user){
       return res.status(400).json({message:"User already exists"})
       }
       const passwordhash= await bcrypt.hash(password,10)
        const newUser= await User.create({
      fullname,
      email,
      password:passwordhash,
      confirmpassword
        })
         newUser.save();
        const token= jwtCookieToken(newUser._id,res)
         return res.status(200).json({message:"User created successfully" ,newUser,token}) 
  } catch (error) {
    console.log("error in signup controller",error)
   return res.status(500).json({message:"Internal server error"})
  }
}


export const login = async (req, res) => {
  const email = req.body.email?.toString().trim();
  const password = req.body.password?.toString().trim();

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "password not match" } );
    }
  const token= jwtCookieToken(user._id,res)
    return res.status(200).json({ message: "Login successful" , token,user:{ 
      _id:user._id,
      fullname:user.fullname,
      email:user.email
    } } );
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


 export const logout = async( req, res )=>{
  try {
    res.clearCookie("token",{
      httpOnly:true,
      secure:true,
      sameSite:"none",
    }) 
    return res.status(200).json({message:"Logout successfully"})
  } catch (error) {
console.log("error in the logout sectino",error )
return res.status(500).json({message:"Internat serve error"})
  }
 }


 export const allUsers= async(req ,res)=>{
  try {
    
    const loginUserId= req.user._id
   const allUsers= await User.find({_id:{$ne:loginUserId}}).select("-password -confirmpassword ")
   return  res.status(200).json({message:"all users",allUsers })
    

  } catch (error) {
    console.log("error in allUsers",error)
    return res.status(500).json({message:"Internal serve error"})
  }
 }