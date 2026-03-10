


const registeruser=asyncHolder(async(req,res)=>{
  console.log("FILES:", req.files)
  
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
   const existingUser= await User.findOne({
    $or:[{email},{username}]
   })
   if(existingUser){
    throw new ApiError(409,"User already exist with this email or username")
   }

const avatarFile = req.files?.avatar?.[0];
const coverFile = req.files?.coverimage?.[0];

if (!avatarFile) {
 throw new ApiError(400,"Avatar image is required")
}

const avatarLocalPath = avatarFile.path

let coverImageLocalpath = ""
if (coverFile) {
 coverImageLocalpath = coverFile.path
}

const avatar = await uploadeOnCloudinary(avatarLocalPath)

if (!avatar || !avatar.url) {
 throw new ApiError(400,"Avatar upload failed")
}

// let coverimage
// if (coverImageLocalpath) {
//  coverimage = await uploadeOnCloudinary(coverImageLocalpath)
// }
let coverimage = ""

if (coverImageLocalpath) {
  const uploadedCover = await uploadeOnCloudinary(coverImageLocalpath)

  if (uploadedCover && uploadedCover.url) {
    coverimage = uploadedCover.url
  }
}




   /*
  const avatarFile = req.files?.avatar?.[0];
const coverFile = req.files?.coverimage?.[0];

if (!avatarFile) {
 throw new ApiError(400,"Avatar image is required")
}

const avatarLocalPath = `${avatarFile.destination}/${avatarFile.filename}`

let coverImageLocalpath = ""
if (coverFile) {
 coverImageLocalpath = `${coverFile.destination}/${coverFile.filename}`
} */

  // const user = await User.create({
  //     avatar:avatar.url,
  //     coverimage:coverimage?.url ||"",
  //    fullname,
  //    username:username.toLowerCase(),
  //    email,
  //    password,

  // })

    const user = await User.create({
  avatar: avatar.url,
  coverimage: coverimage,
  fullname,
  username: username.toLowerCase(),
  email,
  password
})









  const createUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )
if (!createUser) {
     throw new ApiError(500,"something went wrong while creating user");
    
}

 return res.status(201).json(
    new ApiRespons(201,createUser,"User created successfully")

 )
  })
 
   
export{registeruser};




