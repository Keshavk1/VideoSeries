import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
export const registerUser = asyncHandler(async (req, res) => {
    // get user data from request body
    const {fullname, username,email, password } = req.body;
    
    // validate user data
    if ([fullname, username,email, password ].some((field) => field.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }
    // check if user already exists in database
    const existingUser = await User.findOne({email});
    if(existingUser) {
        throw new apiError(409, "User already exists");
    }

   // check for images,check for avatar
   const avatarFile = req.files['avatar'] ? req.files['avatar'][0] : null;
   const coverImageFile = req.files['coverImage'] ? req.files['coverImage'][0] : null;
   if(!avatarFile) {
    throw new apiError(400, "Avatar image is required");
   }

   // upload image to cloudinary and get the url
   const avatarUrl = await uploadOnCloudinary(avatarFile);
   const coverImageUrl = coverImageFile ? await uploadOnCloudinary(coverImageFile) : null;
   if(!avatarUrl) {
    throw new apiError(500, "Failed to upload avatar image");
   }
   // save the url to database
    // create user object with the url and other data
   const newUser = new User({
    fullname,
    username : username.toLowerCase(),
    email,
    password,
    avatar: avatarUrl,
    coverImage: coverImageUrl
   });
   await newUser.save();
   // remove password and refresh token field from the response object
   // check for user creation and return response to client
   const createdUser = await newUser.findById(newUser._id).select("-password -refreshToken") ; // to remove password and refresh token from the response object
   if(!createdUser) {
    throw new apiError(500, "Failed to create user");
   }
    // return response to client
    res.status(201).json(new apiResponse(201, createdUser, "User registered successfully"));
});

export const loginUser = asyncHandler( async (req,res) => {
    // get user data from request body
    const {email, password} = req.body;
    // validate user data
    if(!email || !password) {
        throw new apiError(400, "All fields are required");
    }
    // check if user exists in database
    const user = await User.findOne({ email });
    if(!user) {
        throw new apiError(404, "User not found");
    }   
    // check if password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid) {
        throw new apiError(401, "Invalid password");
    }
    // return response to client
    res.status(200).json(new apiResponse(200, user, "User logged in successfully"));
});

