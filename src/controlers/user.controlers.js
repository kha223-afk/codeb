
import { asyncHolder } from "../utill/asyncholder.js";
import {User} from "../models/user.model.js"
import { ApiError }  from "../utill/apiError.js";
import uploadeOnCloudinary from "../utill/cloudinary.js";
import { ApiRespons } from "../utill/ApiRespons.js";
const registeruser=asyncHolder(async(req,res)=>{
    //user information from frontend 
    //validation
    //check for user account already exist :email,username
    //check for image cloudinary,check for avatar
    //upload image to cloudinary,avatar
    //create user object-creat entry in db
    //remove password and refresh token from response
    //check for user creation
    //return responsere
    const {username,email,fullname,password} = req.body
    console.log("email:",email);
   if ([fullname,username,email,password].some((field)=> field?.trim()=="")) {
    throw new ApiError(400,"All field are required") 
   }
   const existingUser= User.findOne({
    $or:[{email},{username}]
   })
   if(existingUser){
    throw new ApiError(409,"User already exist with this email or username")
   }
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalpath =req.files?.coverimage[0]?.path;
   if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar image is required");
    
   }
  const avatar=await uploadeOnCloudinary(avatarLocalPath);
  const coveraImage =await uploadeOnCloudinary(coverImageLocalpath);
  if (!avatar) {
     throw new ApiError(400,"Avatar image is required");
  }
  const user = await User.create({
      avatar:avatar.url,
      coverimage:coverimage?.url ||"",
     fullname,
     username:username.toLowerCase(),
     email,
     password,

  })
  const createUser=await user.findById(user._id).select(
    "-password -refreshToken"
  )
if (!createUser) {
     throw new ApiError(500,"something went wrong while creating user");
    
}

 return res.status(201).json(
    new ApiRespons(201,createUser,"User created successfully")

 )
  })
 
   
export{registeruser}
