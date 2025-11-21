import {cloudinaryfileupload} from "../utils/cloudinary.js"
import { User } from "../models/user.model.js";
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

   const uploadedfileonlocalpath= req.files?.avatar[0]?.path;
   if(!uploadedfileonlocalpath) return res.status(400).json({messgae:"avatar file is required"});

   const avatarlocalpath=await cloudinaryfileupload(uploadedfileonlocalpath);
   if(!avatarlocalpath) return res.status(400).json({messgae:"avatar file is required on cloudinary"});


    const newUser= await User.create({
        Username:Username.toLowerCase(),
        avatar:avatarlocalpath.url,
        email:email,
        password:password
    })
    
    const newUserCreated=User.findById(_id).select("-password -refreshtoken");
    if(!newUserCreated) return res.status(500).json({message:"Error while creating a new user for registration"})
    
    return res.status(201).json({message:"User created successfully in database"},newUserCreated)

        
    } catch (error) {
        console.log("registration error: ", error);
        
        return res.status(500).json({message:"registration failed "})
        
    }
    
}
export {registerUser}