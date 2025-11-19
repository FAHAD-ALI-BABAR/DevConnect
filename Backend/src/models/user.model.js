import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const UserSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:[true,"Name is required"],
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
        minlength: [5, "Username must be at least 5 characters"],
        maxlength: [30, "Username cannot exceed 30 characters"],
    },
    avatar:{
        type:String,
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Passowrd is required"]
    },
    refreshtoken:{
        type:String
    }
},{timestamps:true})

UserSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,12);
    next();
})
UserSchema.methods.ispasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password);

}
export const User=mongoose.model("User",UserSchema);