import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`MongoDb connected and DB host:`)
    } catch (error) {
        console.log("Error in connecting database",error)
    }
}

export default connectDB 