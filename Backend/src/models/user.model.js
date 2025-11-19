import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Name is required"],
        unique:true,
        lowercase:true,
        trim:true,
        minlength: [5, "Username must be at least 5 characters"],
        maxlength: [30, "Username cannot exceed 30 characters"],
    },
    
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
export const User=mongoose.model("User",UserSchema);