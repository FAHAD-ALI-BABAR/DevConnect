import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
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