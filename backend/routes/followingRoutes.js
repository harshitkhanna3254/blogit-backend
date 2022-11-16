const express = require("express");
const {
  getFollowing,
  addFollowing,
  deleteFollowing,
} = require("../controllers/followingController");

const { jwtCookieAuth } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router
  .route("/:username?")
  .get(jwtCookieAuth, getFollowing)
  .put(jwtCookieAuth, addFollowing)
  .delete(jwtCookieAuth, deleteFollowing);

module.exports = router;
