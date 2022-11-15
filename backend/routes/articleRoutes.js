const express = require("express");
const {
  getArticles,
  postArticle,
  updateArticle,
} = require("../controllers/articleController");

const { protect, jwtCookieAuth } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/:id?").get(jwtCookieAuth, getArticles);
router.route("/").post(jwtCookieAuth, postArticle);
router.route("/:id").put(jwtCookieAuth, updateArticle);

module.exports = router;
