import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
        CLOUD_NAME: process.env.CLOUD_NAME, 
        API_KEY: process.env.API_KEY, 
        API_SECRET: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const cloudinaryfileupload=async(localfilepath)=>{
        try {
            if(!localfilepath) return null;
            const fileuploadresponse=await cloudinary.uploader.upload(localfilepath,{
                resource_type:"auto"
            })
            console.log("file has been uploaded on cloudinary successfully :", fileuploadresponse.url);
            return fileuploadresponse
            
            
        } catch (error) {
            fs.unlinkSync(localfilepath)
            return null;
            
        }

    }
    export {cloudinaryfileupload}