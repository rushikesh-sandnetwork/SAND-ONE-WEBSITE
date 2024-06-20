const asyncHandler = require("../utils/asyncHandler");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const User  = require("../models/user.model"); // Ensure this matches your export


const registerUser = asyncHandler(async (req, res) => {
    try {
      const { name , surname , email , password , role} = req.body;
  
      const existedUser = await User.findOne({ email });
      if (existedUser) {
        console.log("user without emai");
        throw new apiError(409, "User with this email already exists");
      }
  
     

      const user = await User.create({
        name , surname , email , password , role
      });
  
      const createdUser = await User.findById(user._id)
      if (!createdUser) {
        throw new apiError(500, "Error retrieving registered user data");
      }
  
  
      res.status(200).json(new apiResponse(201, createdUser, "User successfully registered"));
  
    } catch (error) {
      const statusCode = error.statusCode || 500; // Default to internal server error
      const errorMessage = error.message || "An unexpected error occurred";
  
      res.status(statusCode).json(new apiResponse(statusCode, null, errorMessage));
    }
  });


const loginUser = asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        throw new apiError(401, "Invalid user email or password. Password and Email are required");
      }
  
      const user = await User.findOne({ email: email });
  
      if (!user) {
        throw new apiError(401, "User does not exist. Create new account");
      }
  
      return res.status(200).json(new apiResponse(200, user, "User successfully loggedIn"))
    } catch (error) {
      const statusCode = error.statusCode || 500; 
      const errorMessage = error.message || "An unexpected error occurred";
  
      res.status(statusCode).json(new apiResponse(statusCode, null, errorMessage));
    }
  
  })
module.exports = { loginUser , registerUser };
