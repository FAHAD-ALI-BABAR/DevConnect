import mongoose from "mongoose";
 const databaseConnection=async()=>{
    try {
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DBNAME}`);
       console.log(`Database connection Successful : ${connectionInstance.connection.host}`);
       
        
    } catch (error) {
        console.log(`Database Connection Failed : `, error);
        process.exit(1);
        
        
    }
}
export default databaseConnection