import express from 'express'
import 'dotenv/config'
const app=express();
const port=process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.send("Hello world!")
})
app.get("/login",(req,res)=>{
    res.send("Please login")
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})