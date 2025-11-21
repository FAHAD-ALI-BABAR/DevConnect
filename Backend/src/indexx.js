import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import  databaseConnection  from './db/db.js';
const port=process.env.PORT || 5000

const app=express();


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(cookieParser());

app.get("/login",(req,res)=>{
    console.log(req.body);
    
    return res.send("Helloe world!")
})

//import routes
import userRouter from "./routes/user.routes.js"
//routes declaration 
app.use("/api/v1/users",userRouter)

databaseConnection().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);  
    })

}).catch((err)=>{
    console.log("Database connection Failed! ", err);
});