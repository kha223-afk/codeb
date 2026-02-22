import mongoose,{Schema}  from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate/lib/mongoose-aggregate-paginate";
const videoSchema =new Schema(
    {
        videoFile:{
            type:String,//cloudinary url
            required:true
        },
        thambnail:{
            type:String,//cloudinary url
            required:true
        },
        title:{
            type:String,
            required:true,
            
        },
          discription:{
            type:String,
            required:true,
            
        },
        duration:{
            type:Number,//cloudinary duration
            required:true,
            
        },
        views:{
            type:Number,
            default:0
            
        },
        isPublished:{
            type:Boolean
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"

        }


 },

{
    timestamps:true
}

)
videoSchema.plugin(aggregatePaginate)

export const Video=mongoose.model("Video",videoSchema)