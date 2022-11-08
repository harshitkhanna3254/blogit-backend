const express = require("express");
const {
  getArticles,
  postArticle,
  updateArticle,
} = require("../controllers/articleController");

const router = express.Router();

router.route("/").get(getArticles).post(postArticle);

router.route("/:id").put(updateArticle);

module.exports = router;
