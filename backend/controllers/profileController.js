//Imports
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

//Constants
const { SUCCESS, HASH_SALT } = require("../constants/constants");

//Schema
const Profile = require("../schema/profileSchema");
const User = require("../schema/userSchema");

const getProfile = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  console.log(loggedInUser);

  const user = await Profile.findOne({ user: loggedInUser._id });

  res.json(user);
});

const getHeadline = asyncHandler(async (req, res) => {
  try {
    console.log(
      "Inside get headline controller. Params: ",
      req.params.username
    );

    const loggedInUser = req.user;

    const username = req.params.username || loggedInUser.username;

    console.log(loggedInUser, username);

    const userData = await Profile.findOne({ username }).select("headline");

    console.log(userData);

    res.status(200);
    res.json({ username, headline: userData.headline });
  } catch (error) {
    res.status(500);
    throw new Error(
      "Some problem while fetching headline for user " + username
    );
  }
});

const updateHeadline = asyncHandler(async (req, res) => {
  console.log("Update headline controller");

  const loggedInUser = req.user;
  console.log(loggedInUser);

  console.log(req.body);

  const updatedUser = await Profile.findOneAndUpdate(
    { user: loggedInUser._id },
    req.body,
    { new: true }
  );

  res.status(200);
  res.json({ username: loggedInUser.username, headline: updatedUser.headline });
});

const getEmail = asyncHandler(async (req, res) => {
  console.log("Inside get email controller", req.params.username);

  const loggedInUser = req.user;

  const username = req.params.username || loggedInUser.username;

  const userData = await Profile.findOne({ username }).select("email");
  console.log(userData);

  res.status(200);
  res.json({ username, email: userData.email });
});

const updateEmail = asyncHandler(async (req, res) => {
  console.log("Update email controller");
  try {
    const loggedInUser = req.user;

    const updatedUser = await Profile.findOneAndUpdate(
      { user: loggedInUser._id },
      req.body,
      { new: true }
    );

    res.status(200);
    res.json({ username: loggedInUser.username, email: updatedUser.email });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while updating email");
  }
});

const getZipcode = asyncHandler(async (req, res) => {
  console.log("Get zipcode controller", req.params.username);

  const loggedInUser = req.user;
  const username = req.params.username || loggedInUser.username;
  const userData = await Profile.findOne({ username }).select("zipcode");

  res.status(200);
  res.json({ username, zipcode: userData.zipcode });
});

const updateZipcode = asyncHandler(async (req, res) => {
  console.log("Update zipcode controller");
  try {
    const loggedInUser = req.user;

    const updatedUser = await Profile.findOneAndUpdate(
      { user: loggedInUser._id },
      req.body,
      { new: true }
    );

    res.status(200);
    res.json({ username: loggedInUser.username, zipcode: updatedUser.zipcode });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while updating zipcode");
  }
});

const getDob = asyncHandler(async (req, res) => {
  console.log("Get dob controller");
  const loggedInUser = req.user;

  const username = req.params.username || loggedInUser.username;

  const userData = await Profile.findOne({ user: loggedInUser._id }).select(
    "dob"
  );

  const dobInMs = userData.dob.getTime();

  res.status(200);
  res.json({ username, dob: dobInMs });
});

const getAvatar = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;

  const user = await Profile.findOne({ user: loggedInUser._id }).select(
    "avatar"
  );

  console.log(user);

  res.status(200);
  res.json({ username: loggedInUser.username, avatar: user.avatar });
});

const updateAvatar = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;

  const updatedUser = await Profile.findOneAndUpdate(
    { user: loggedInUser._id },
    req.body,
    { new: true }
  );

  res.status(200);
  res.json({ username: loggedInUser.username, avatar: updatedUser.avatar });
});

const updatePassword = asyncHandler(async (req, res) => {
  console.log("Update Password controller");
  try {
    const loggedInUser = req.user;

    console.log(loggedInUser, req.body.password);

    //Hash password
    const salt = await bcrypt.genSalt(HASH_SALT);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const updatedUser = await User.findByIdAndUpdate(loggedInUser._id, {
      password: hashedPassword,
    });

    console.log(updatedUser);

    res.status(200);
    res.json({ username: loggedInUser.username, result: SUCCESS });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while updating Password");
  }
});

module.exports = {
  getProfile,
  getHeadline,
  updateHeadline,
  getEmail,
  updateEmail,
  getZipcode,
  updateZipcode,
  getDob,
  getAvatar,
  updateAvatar,
  updatePassword,
};
