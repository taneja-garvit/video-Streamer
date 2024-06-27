import mongoose, {Mongoose, Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile:{
        type:String, //cloudurl
        require:true,
    },
    thumbnail:{
        type:String, //cloudurl
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    discription:{
        type:String, 
        require:true,
    },
    duration:{
        type:Number, 
        require:true,
    },
    views:{
        type:Number,
        require:true,
        default:0,
    },
    isPublished:{
        type:boolean, 
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },





},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)