import {cloudinaryfileupload} from "../utils/cloudinary.js"
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
const registerUser=async (req,res,next)=>{
    try {
        const {Username,email,password,avatar}=req.body;
    console.log("email: ",email,password,Username,avatar);
    if(!req.body) return res.status(400).json({message:"All field are empty"})
    
    if(!Username || !email || !password){
        return res.status(404).json({messgae:"registered failed because all field are not filled properly"});
    }
    
    const exist=await User.findOne({
        $or:[{email:email},{Username:Username}]
    });
    if(exist){
         return res.status(409).json({messgae:"User already exist"});

    }
    console.log("📁 Files received:", req.files);

   const uploadedfileonlocalpath= req.files?.avatar[0]?.path;
   if(!uploadedfileonlocalpath) return res.status(400).json({messgae:"avatar file is required"});

   console.log("avatar file is on server :" ,uploadedfileonlocalpath);
   

   const avatarlocalpath=await cloudinaryfileupload(uploadedfileonlocalpath);
   
   
   if(!avatarlocalpath) return res.status(400).json({messgae:"avatar file is required on cloudinary"});
   console.log("avatar file is on clodinary: ", avatarlocalpath);
   


    const newUser= await User.create({
        Username:Username.toLowerCase(),
        avatar:avatarlocalpath.url,
        email:email,
        password:password
    })
    
    const newUserCreated=await User.findById(newUser._id).select("-password -refreshtoken");
    if(!newUserCreated) return res.status(500).json({message:"Error while creating a new user for registration"})
    
return res.status(201).json({
    success: true,
    message: "User created successfully in database",
    data: newUserCreated
})
        
    } catch (error) {
        console.log("registration error: ", error);
        
        return res.status(500).json({message:"registration failed "})
        
    }
    
}

const generateAccessTokenAndRefreshtoken=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accesstoken=await user.generateAccessToken()
        const refreshtoken=await user.generateRefreshToken()
        // console.log("acces token is :",accesstoken);
        // console.log("refresh toekn is ",refreshtoken);
        
        
        await user.save({validateBeforeSave:false})
        return {accesstoken,refreshtoken}

        
    } catch (error) {
        console.log("error in generating token :" ,error);
        
        return res.status(500).json({message:"error in generating tokens"})
        
    }
}

const loginUser=async (req,res,next)=>{
    try {
        const {email,password,Username}=req.body
        console.log("info is :" ,req.body);
        
        if(!(email || Username)) return res.status(400).json({message:"please enter email or password"})
            const userfind=await User.findOne({
                $or:[{email:email},{Username:Username}]
            })

            if(!userfind) return res.status(404).json({message:"User doesnot exist so can't login"})

          const validpassword=await userfind.ispasswordCorrect(password) 
          if(!validpassword) return res.status(401).json({message:"invalid password"}) 
          
          const{accesstoken,refreshtoken}=await generateAccessTokenAndRefreshtoken(userfind._id)
        //   console.log("access token is :", accesstoken);
        //   console.log("refresh token is :",refreshtoken);
          
           
          const loggedinuser=await User.findById(userfind._id).select("-refreshtoken -password") 

          const options={

            httpOnly:true,
            secure:true
          }

                  return res.status(200)
            .cookie("Accesstoken", accesstoken, options)
            .cookie("refreshtoken", refreshtoken, options)
            .json({
                message: "User logged in successfully",
                user: loggedinuser,
                accesstoken,
                refreshtoken
            })

        
    } catch (error) {
        console.log("login failed", error);
        
        return res.status(500).json({messgae:"login failed"})
        
    }
}


const logoutUser=async (req,res)=>{
   const userid= req.user?._id
  await User.findByIdAndUpdate(userid,{
    $set:{
        refreshtoken:undefined
    }
},
    {
        new:true
    }

)
 const options={

            httpOnly:true,
            secure:true
          }
 
 return res.status(200)
            .clearCookie("Accesstoken", options)
            .clearCookie("refreshtoken", options)
            .json({ message: "User logged out successfully" });

}

const newrefreshaccesstoken=async (req,res)=>{
    const incomingrefreshtoken=req.cookies.refreshtoken || req.body.refreshtoken
    if(!incomingrefreshtoken) return res.status(401).json({message:"unauthorized request"})
       try {
         const decodedtoken=jwt.verify(token,process.env.REFRESH_TOKEN)
     const user=await User.findById(decodedtoken?._id)
     if(!user) return res.status(401).json({message:"invalid refreshtoken"})
         if(incomingrefreshtoken !==user.refreshtoken) return res.status(401).json({message:"refresh token is expired or used"})
             const options={
         httpOnly:true,
     secure:true
 }
  const {accesstoken,newrefreshtoken}=await generateAccessTokenAndRefreshtoken(user._id)
   return res.status(200)
             .cookie("Accesstoken", accesstoken, options)
             .cookie("refreshtoken", newrefreshtoken, options)
             .json({
                 message: "access token refreshed successfully",
                 accesstoken,
                 refreshtoken:newrefreshtoken
             })
       } catch (error) {
        return res.status(401).json({messgae:"invalid refresh token"});
        
       }

}
export {registerUser,loginUser,logoutUser,newrefreshaccesstoken}