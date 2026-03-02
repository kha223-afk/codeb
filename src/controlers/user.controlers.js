
import { asyncHolder } from "../untill/asynkholder.js";
const registeruser=asyncHolder(async(req,res)=>{
     res.status(200).json({
        message:"ok",
        // success:true
    })
    
})



export{registeruser}
