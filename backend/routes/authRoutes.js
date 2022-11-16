const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const { protect, jwtCookieAuth } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(jwtCookieAuth, logoutUser);

module.exports = router;
