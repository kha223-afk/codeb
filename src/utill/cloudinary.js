

/*

import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET

    });
    
const  uploadeOnCloudinary= async (localFilePath)=>{
    try {
        if(!localFilePath)return null;
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        console.log("Your file upload successfully ",response.url);
        
            
        return response;
        
    } catch (error) {
      fs.unlinkSync(localFilePath);
      return null;

        
    }

}
export {uploadeOnCloudinary};*/



import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadeOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })

    console.log("Uploaded:", result.url)

    // delete file safely
    try {
      if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath)
      }
    } catch (e) {
      console.log("File delete skipped:", e.message)
    }

    return result

  } catch (error) {

    console.log("Cloudinary error:", error)

    try {
      if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath)
      }
    } catch {}

    return null
  }
}

export { uploadeOnCloudinary }