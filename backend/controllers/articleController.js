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
        res.status(200);
        res.json({ article });
      } catch (error) {
        res.status(401);
        throw new Error("Unable to find the article with the requested id");
      }
    } else {
      //Id is a username
      try {
        const articles = await Article.find({ author: id });
        res.status(200);
        res.json({ articles });
      } catch (error) {
        res.status(401);
        throw new Error("Unable to find articles for the requested user");
      }
    }
  } else {
    //Fetch all articles of logged in user
    const articles = await Article.find({ user: loggedInUser._id });

    res.status(200);
    res.json({ articles });
  }
});

const postArticle = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const loggedInUser = req.user;
  if (!text) {
    res.status(400);
    throw new Error("Text not found");
  }

  const newArticle = await Article.create({
    user: loggedInUser._id,
    text: req.body.text,
    author: loggedInUser.username,
  });

  res.status(200).json(newArticle);
});

const updateArticle = asyncHandler(async (req, res) => {
  const articledId = req.params.id;
  const { text, commentId } = req.body;
  const loggedInUser = req.user;

  if (!articledId) {
    res.status(400);
    throw new Error("Please add article id to params");
  }

  if (!text) {
    res.status(400);
    throw new Error("Text not found");
  }

  const article = await Article.findById(articledId);

  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }

  if (!commentId) {
    console.log("No comment id sent");
    if (article.user.toString() !== loggedInUser._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to update this article");
    }

    const updatedComment = {
      user: loggedInUser._id,
      name: loggedInUser.name,
      comment: text,
    };

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );

    if (updatedArticle) {
      res.status(200);
      res.json(updatedArticle);
    } else {
      res.status(400);
      throw new Error("Article could not be updated");
    }
  } else if (commentId == -1) {
    console.log("Comment Id: -1");
    const newComment = {
      user: loggedInUser._id,
      username: loggedInUser.username,
      comment: text,
    };

    article.comments.push(newComment);

    await article.save();

    res.status(200);
    res.json({ username: loggedInUser.username, article });
  } else {
    console.log("Comment Id sent");
    if (!isValidObjectId(commentId)) {
      res.status(400);
      throw new Error("Comment Id is not valid");
    }

    const commentFound = article.comments.find((comment) => {
      return comment._id == commentId;
    });

    if (!commentFound) {
      res.status(400);
      throw new Error("No comment found with the requested Id");
    }

    console.log(commentFound);
    console.log(loggedInUser);

    if (commentFound.user.toString() != loggedInUser._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to update this comment");
    }

    const commentFoundIdx = article.comments.indexOf(commentFound);

    const updatedComment = {
      user: loggedInUser._id,
      username: loggedInUser.username,
      comment: text,
    };

    article.comments[commentFoundIdx] = updatedComment;

    await article.save();

    res.status(200);
    res.json({ article });
  }
});

module.exports = {
  getArticles,
  postArticle,
  updateArticle,
};
