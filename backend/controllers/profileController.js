//Imports
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");

//Constants
const { SUCCESS, HASH_SALT, BLOGIT_PRESET } = require("../constants/constants");

//Schema
const Profile = require("../schema/profileSchema");
const User = require("../schema/userSchema");

const getProfile = asyncHandler(async (req, res) => {
  // console.log(req.user);
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
  const loggedInUser = req.user;

  try {
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

const getName = asyncHandler(async (req, res) => {
  console.log("Inside get name controller", req.params.username);

  try {
    const loggedInUser = req.user;

    const username = req.params.username || loggedInUser.username;

    const userData = await Profile.findOne({ username }).select("name");
    console.log(userData);

    res.status(200);
    res.json({ username, name: userData.name });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while getting name");
  }
});

const updateName = asyncHandler(async (req, res) => {
  console.log("Update name controller");
  try {
    const loggedInUser = req.user;

    const updatedUser = await Profile.findOneAndUpdate(
      { user: loggedInUser._id },
      req.body,
      { new: true }
    );

    res.status(200);
    res.json({ username: loggedInUser.username, name: updatedUser.name });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while updating name");
  }
});

const getPhoneNumber = asyncHandler(async (req, res) => {
  console.log("Inside get phone number controller", req.params.username);

  try {
    const loggedInUser = req.user;

    const username = req.params.username || loggedInUser.username;

    const userData = await Profile.findOne({ username }).select("phoneNumber");
    console.log(userData);

    res.status(200);
    res.json({ username, phoneNumber: userData.phoneNumber });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while getting name");
  }
});

const updatePhoneNumber = asyncHandler(async (req, res) => {
  console.log("Update phone number controller");
  try {
    const loggedInUser = req.user;

    const updatedUser = await Profile.findOneAndUpdate(
      { user: loggedInUser._id },
      req.body,
      { new: true }
    );

    res.status(200);
    res.json({
      username: loggedInUser.username,
      phoneNumber: updatedUser.phoneNumber,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while updating name");
  }
});

const getGender = asyncHandler(async (req, res) => {
  console.log("Get gender controller", req.params.username);

  try {
    const loggedInUser = req.user;

    const username = req.params.username || loggedInUser.username;

    const userData = await Profile.findOne({ username }).select("gender");
    console.log(userData);

    res.status(200);
    res.json({ username, gender: userData.gender });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while getting gender");
  }
});

const updateGender = asyncHandler(async (req, res) => {
  console.log("Update gender controller");
  try {
    const loggedInUser = req.user;

    const updatedUser = await Profile.findOneAndUpdate(
      { user: loggedInUser._id },
      req.body,
      { new: true }
    );

    res.status(200);
    res.json({ username: loggedInUser.username, gender: updatedUser.gender });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while updating gender");
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
    "avatarCloud"
  );

  console.log(user);

  res.status(200);
  res.json({ username: loggedInUser.username, avatar: user.avatarCloud });
});

const updateAvatar = asyncHandler(async (req, res) => {
  console.log("Update avatar called");
  const loggedInUser = req.user;

  //Here, req.body will contain the base_64 encoded image string as 'avatar'
  // console.log("Req.body: Base 64 encoded image string: ", req.body.avatar);

  //Cloudinary
  var cloudUploadRes;
  try {
    cloudUploadRes = await cloudinary.uploader.upload(req.body.avatar, {
      upload_preset: BLOGIT_PRESET,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem with cloudinary");
  }

  //Saving cloudinary res in avatar
  try {
    const updatedUser = await Profile.findOneAndUpdate(
      { user: loggedInUser._id },
      { avatarCloud: cloudUploadRes },
      { new: true }
    );

    res.status(200);
    res.json({
      username: loggedInUser.username,
      avatar: updatedUser.avatarCloud,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Some problem while updating Image");
  }
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
  getName,
  updateName,
  getGender,
  updateGender,
  getPhoneNumber,
  updatePhoneNumber,
  getZipcode,
  updateZipcode,
  getDob,
  getAvatar,
  updateAvatar,
  updatePassword,
};
