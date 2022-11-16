const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("mongoose");

const Profile = require("../schema/profileSchema");

const getFollowing = asyncHandler(async (req, res) => {
  let username = req.params.username;

  const loggedInUser = req.user;

  try {
    if (!username) {
      username = loggedInUser.username;
    }

    console.log(username);

    const userWithFollowing = await Profile.findOne({ username }).select(
      "following"
    );

    res.status(200);
    res.json({ username, following: userWithFollowing.following });
  } catch (error) {
    res.status(400);
    throw new Error("Username invalid");
  }
});

const addFollowing = asyncHandler(async (req, res) => {
  const username = req.params.username;

  const loggedInUser = req.user;

  if (!username) {
    res.status(400);
    throw new Error("Send username in the params");
  }

  if (username == loggedInUser.username) {
    res.status(400);
    throw new Error("Cannot follow yourself");
  }
  const user = await Profile.findOne({ user: loggedInUser._id });

  const alreadyFollowing = user.following.find((profile) => {
    return profile.username == username;
  });

  if (alreadyFollowing) {
    res.status(400);
    throw new Error("User is already followed by the logged in user");
  }

  try {
    const userToFollow = await Profile.findOne({ username });

    const userToPush = {
      user: userToFollow._id,
      username: userToFollow.username,
      name: userToFollow.name,
    };

    user.following.push(userToPush);

    await user.save();

    res.status(201);
    res.json({ username: loggedInUser.username, following: user.following });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("User with the requested username not found");
  }
});

const deleteFollowing = asyncHandler(async (req, res) => {
  const username = req.params.username;

  const loggedInUser = req.user;

  if (!username) {
    res.status(400);
    throw new Error("Send username in the params");
  }

  if (username == loggedInUser.username) {
    res.status(400);
    throw new Error("You dont follow youself");
  }

  const user = await Profile.findOne({ user: loggedInUser._id });

  const alreadyFollowing = user.following.find((profile) => {
    return profile.username == username;
  });

  console.log(alreadyFollowing);

  if (!alreadyFollowing) {
    res.status(400);
    throw new Error("User is not followed by the user");
  }

  const alreadyFollowingIdx = user.following.indexOf(alreadyFollowing);

  user.following.splice(alreadyFollowingIdx, 1);

  await user.save();

  res.status(200);
  res.json({ username: loggedInUser.username, following: user.following });
});

module.exports = {
  getFollowing,
  addFollowing,
  deleteFollowing,
};
