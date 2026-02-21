const asyncHolder=(requestHolder)=>{(req,res,next)=>{
 Promise.resolve(requestHolder(req,res,next)).catch((err)=>next(err))

}}












// const asynkHolder= (fun)=>async()=>{
//     try {
//         await fun(res,req,next)
        
//     } catch (error) {
//         res.status(error.code||500).json({
//             massage:error.massage,
//             success:false
//         })
        
    
//     }
// }
export{asyncHolder}