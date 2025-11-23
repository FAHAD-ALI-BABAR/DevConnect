import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
const JWTverify=async (req,res,next)=>{
  try {
     const token= req.cookies.Accesstoken || req.header("Authorization")?.replace("Bearer ","")
     if(!token) return res.status(401).json({message:"Unauthorized request"})
  
     const decodedjwtinfo=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     const user=await User.findById(decodedjwtinfo?._id).select("-password -refreshtoken")
  
     req.user=user;
     next();
  } catch (error) {
    return res.status(401).json({message:"invalid access token"})
    
  }



}
export default JWTverify