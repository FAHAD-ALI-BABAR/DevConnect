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
    this.password=await bcrypt.hash(this.password,12);
    next();
})

UserSchema.methods.ispasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password);

}

UserSchema.methods.generateAccessToken=async function(){
    jwt.sign({
        _id:this._id,
        Username:this.Username,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        
    })
}
//REFRESH TOKEN KA PAYLOAD MN INFO KAM HOTI HA OR EXPIRY DATE ZIYADA HOTI HA

UserSchema.methods.generateRefreshToken=async function(){
    jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN,
    {
       expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        
    })
}
export const User=mongoose.model("User",UserSchema);