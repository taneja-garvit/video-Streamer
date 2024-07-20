import mongoose, {Schema} from "mongoose";
// import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,

    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar:{
        type: String, //cloudinary url
        required: true,
    },
    coverImage:{
        type: String,
    },
    watchHistory: [
    {
        type: Schema.Types.ObjectId,
        ref: "Video",
    }
        ],
    
    password:{
        type:String, 
        required:[true,"Password is important"],
    },
    refreshToken:{
        type:String,
    }
},
    {
     timestamps:true,
    }
)
userSchema.pre("save", async function(next) {         // pre is middleware used to perform funct just before code
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){   
  return await bcrypt.compare(password,this.password) //comparing original and encrypted password
}

userSchema.methods.generateAccessToken =  function(){
   return  jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username,
            fullname: this.fullname
        },
        process.env.Access_token_secret,
        {
            expiresIn: process.env.Access_token_expiry
        }
    )
}

userSchema.methods.generateRefreshToken =  function(){
    return jwt.sign(
        {
            _id: this._id,
           
        },
        process.env.Refresh_token_secret,
        {
            expiresIn: process.env.Refresh_token_expiry
        }
    )
}
export const User = mongoose.model("User",userSchema)