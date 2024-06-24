const asyncHandler = require("../utils/asyncHandler");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const User = require("../models/user.model"); // Ensure this matches your export
const jwt = require('jsonwebtoken'); // Ensure JWT is imported


const generateAccessAndRefreshTokens = async (email) => {
  try {
    console.log("generating access and refresh token");
    const user = await User.findOne({ email });
    console.log(user);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Something went wrong while generating refresh and access token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new apiError(409, "User with this email already exists");
  }

  const user = await User.create({
    name, surname, email, password, role
  });

  const createdUser = await User.findById(user._id);
  if (!createdUser) {
    throw new apiError(500, "Error retrieving registered user data");
  }

  res.status(201).json(new apiResponse(201, createdUser, "User successfully registered"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email , password);
  if (!email) {
    throw new apiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ email }]
  });


  console.log(user);

  if (!user) {
    throw new apiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(401, "Invalid user credentials");
  }

  console.log(isPasswordValid);

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.email);
  console.log(accessToken);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser, accessToken, refreshToken
        },
        "User logged in successfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new apiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new apiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true
    };

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new apiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid refresh token");
  }
});


const logoutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new apiResponse(200, {}, "User logged Out"))
})

module.exports = { loginUser, registerUser, refreshAccessToken, generateAccessAndRefreshTokens , logoutUser };
