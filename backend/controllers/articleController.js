const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("mongoose");

const Article = require("../schema/articleSchema");

const getArticles = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const id = req.params.id;

  if (id) {
    if (isValidObjectId(id)) {
      //Id is an Article Id (MongoDB Object)

      try {
        const article = await Article.findById(id);
      } catch (error) {
        res.status(401);
        throw new Error("Unable to update the article for the requested Id");
      }
    } else {
      //id is a username
    }
  }
});

const postArticle = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Text not found");
  }

  const newArticle = await Article.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.status(200).json(newArticle);
});

const updateArticle = asyncHandler(async (req, res) => {
  const article = Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }

  if (article.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedArticle = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (updateArticle) {
    res.status(200);
    res.json(updateArticle);
  } else {
    res.status(400);
    throw new Error("Article could not be updated");
  }
});

module.exports = {
  getArticles,
  postArticle,
  updateArticle,
};
