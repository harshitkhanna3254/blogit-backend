const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Schemas
const Profile = require("../schema/profileSchema");
const User = require("../schema/userSchema");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Profile.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized. Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized. Token not found");
  }
});

const jwtCookieAuth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Cookie val", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    // console.log("From auth mid", req.user);
    next();
  } catch (error) {
    res.status(401);
    res.clearCookie();
    throw new Error("Not Authorized. Token incorrect or not found");
  }
});

module.exports = {
  protect,
  jwtCookieAuth,
};
