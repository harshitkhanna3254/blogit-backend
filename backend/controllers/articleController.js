const asyncHandler = require("express-async-handler");

const getArticles = asyncHandler(async (req, res) => {
  res.json({ defaultMessage: "Get article" });
});

const postArticle = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Text not found");
  }

  res.json({ defaultMessage: `Post article ${req.body.text}` });
});

const updateArticle = asyncHandler(async (req, res) => {
  res.json({ defaultMessage: `Put article ${req.params.id}` });
});

module.exports = {
  getArticles,
  postArticle,
  updateArticle,
};
