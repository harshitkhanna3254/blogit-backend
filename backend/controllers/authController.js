//Imports
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Schemas
const Profile = require("../schema/profileSchema");
const User = require("../schema/userSchema");

//Constants
const {
  HASH_SALT,
  JWT_TOKEN_TIME,
  COOKIE_NAME,
  SUCCESS,
  DUMMY_IMAGE_URL,
} = require("../constants/constants");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, name, phoneNumber, zipcode, gender, dob } =
    req.body;

  if (
    !username ||
    !email ||
    !password ||
    !name ||
    !phoneNumber ||
    !zipcode ||
    !gender ||
    !dob
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(409);
    throw new Error("Username already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(HASH_SALT);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    username,
    password: hashedPassword,
  });

  console.log(user);

  const avatarCloud = {
    url: DUMMY_IMAGE_URL,
  };

  //Create Profile
  const profile = await Profile.create({
    user: user._id,
    username,
    email,
    name,
    phoneNumber,
    zipcode,
    gender,
    dob,
    avatarCloud,
  });

  if (user && profile) {
    res.status(201);

    res.json({
      result: SUCCESS,
      username: profile.username,
      email: profile.email,
      name: profile.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // if (req.cookies.token) {
  //   res.status(400);
  //   throw new Error("A user is already logged in");
  // }

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404);
    throw new Error("User not present");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("Cookie being set");
    res.cookie(COOKIE_NAME, generateToken(user.id), {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      result: SUCCESS,
      _id: user.id,
      username: user.username,
    });
  } else {
    res.status(403);
    throw new Error("Incorrect password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.status(200);
  res.json({ message: SUCCESS });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: JWT_TOKEN_TIME,
  });
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
};
