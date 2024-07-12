const asyncHandler = require("../utils/asyncHandler");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const { json } = require("express");

const generateAccessAndRefreshTokens = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Failed to generate tokens");
  }
};


const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(409).json(new apiError(409, "User with this email already exists"));
  }

  const user = await User.create({ name, surname, email, password, role });

  const createdUser = await User.findById(user._id);
  if (!createdUser) {
    return res.status(500).json(new apiError(500, "Error retrieving registered user data"));
  }

  res.status(201).json(new apiResponse(201, createdUser, "User successfully registered"));
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(new apiError(400, "Email and password are required"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new apiError(404, "User not found"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json(new apiError(401, "Invalid credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.email);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});


const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json(new apiError(401, "Unauthorized request"));
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);
    if (!user || incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json(new apiError(401, "Invalid refresh token"));
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user.email);

    const options = {
      httpOnly: true,
      secure: true
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new apiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
  } catch (error) {
    return res.status(401).json(new apiError(401, "Invalid refresh token"));
  }
});


const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out"));
});

const userDetails = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json(new apiError(400, "User Id not provided."));
    }

    const fetchedUser = await User.findById({ userId });

    if (!fetchedUser) {
      return res.status(400).json(new apiError(400, "No user found with the given ID"));
    };

    return res.status(200).json(new apiResponse(200 , fetchedUser , "User with the given Id fetched."));


  } catch (error) {
    return res.status(400).json(new apiError(400, "Error in fetching user."));
  }
})


module.exports = { loginUser, registerUser, refreshAccessToken, logoutUser , userDetails};