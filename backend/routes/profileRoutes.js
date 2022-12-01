const express = require("express");
const {
  getHeadline,
  updateHeadline,
  getProfile,
  getEmail,
  updateEmail,
  getZipcode,
  updateZipcode,
  getAvatar,
  updateAvatar,
  updatePassword,
  getDob,
  getName,
  updateName,
  getPhoneNumber,
  updatePhoneNumber,
  getGender,
  updateGender,
} = require("../controllers/profileController");

const { jwtCookieAuth } = require("../middlewares/authMiddleware.js");

const router = express.Router();

//Get profile
router.route("/me").get(jwtCookieAuth, getProfile);

//Headline routes
router.route("/headline/:username?").get(jwtCookieAuth, getHeadline);

router.route("/headline").put(jwtCookieAuth, updateHeadline);

//Email routes
router.route("/email/:username?").get(jwtCookieAuth, getEmail);

router.route("/email").put(jwtCookieAuth, updateEmail);

//Name routes
router.route("/name/:username?").get(jwtCookieAuth, getName);

router.route("/name").put(jwtCookieAuth, updateName);

//Phone Number routes
router.route("/phoneNumber/:username?").get(jwtCookieAuth, getPhoneNumber);

router.route("/phoneNumber").put(jwtCookieAuth, updatePhoneNumber);

//Gender routes
router.route("/gender/:username?").get(jwtCookieAuth, getGender);

router.route("/gender").put(jwtCookieAuth, updateGender);

//Zipcode routes
router.route("/zipcode/:username?").get(jwtCookieAuth, getZipcode);

router.route("/zipcode").put(jwtCookieAuth, updateZipcode);

//Dob Routes
router.route("/dob/:username?").get(jwtCookieAuth, getDob);

//Avatar routes
router
  .route("/avatar")
  .get(jwtCookieAuth, getAvatar)
  .put(jwtCookieAuth, updateAvatar);

//Password routes
router.route("/password").put(jwtCookieAuth, updatePassword);

module.exports = router;
