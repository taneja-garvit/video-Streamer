import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation- not empty
  // check if user already exist: uername || email
  // check image and avatar
  // upload to cloudinary
  // create user object - create entry in db
  // remove pass and ref token
  // check for user creation
  // return res

  const { fullname, email, username, password } = req.body; //req.body used to take json or text data like from form, only url data can't be taken

  // validation not empty
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Fill all the fields"); // res.status(400).json("Fill all field")
  }

  // check if user already exist: uername || email
  const existingUser = User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ApiError(400, "User already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath= req.files?.coverImage[0]?.path

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar is required");
  }
  const avatar  = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password, 
    username: username.toLowerCase()

  })

  const createrUser = await User.findById(user._id).select("-password -refreshToken")

  if(!createrUser){
    throw new ApiError(500, "Something went wrong while registring user")
  }

  return  res.status(201).json(
    new ApiResponse(200, createrUser, "User Created Successfully")
  )


});

export { registerUser };
