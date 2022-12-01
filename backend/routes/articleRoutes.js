const express = require("express");
const {
  getArticles,
  postArticle,
  updateArticle,
  getArticlesByRequestedUsers,
} = require("../controllers/articleController");

const { jwtCookieAuth } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/:id?").get(jwtCookieAuth, getArticles);
router.route("/").post(jwtCookieAuth, postArticle);
router.route("/:id").put(jwtCookieAuth, updateArticle);
router.route("/efficient").post(jwtCookieAuth, getArticlesByRequestedUsers);

module.exports = router;
