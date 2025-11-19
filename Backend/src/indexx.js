import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import  databaseConnection  from './db/db.js';
const port=process.env.PORT || 5000

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(cookieparser());


databaseConnection().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);  
    })

}).catch((err)=>{
    console.log("Database connection Failed! ", err);
});