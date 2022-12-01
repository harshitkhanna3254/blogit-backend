const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("mongoose");
const cloudinary = require("../config/cloudinary");
const { BLOGIT_PRESET } = require("../constants/constants");

const Article = require("../schema/articleSchema");

// Efficient way to get articles
// db.articles.find({"author": { $in: ["swat", "abcd"]}}).sort({"createdAt": -1})

const getArticlesByRequestedUsers = asyncHandler(async (req, res) => {
  const { requestedUsers } = req.body;

  try {
    const requestedArticles = await Article.find({
      author: { $in: requestedUsers },
    }).sort({ createdAt: -1 });

    res.status(201);
    res.json({ articles: requestedArticles });
  } catch (error) {
    res.status(401);
    throw new Error("Unable to find articles for the requested user");
  }
});

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
  const { body, name, image } = req.body;
  const loggedInUser = req.user;
  if (!body) {
    res.status(400);
    throw new Error("Text body not found");
  }

  if (image) {
    console.log("Both image and text found");
    //Cloudinary
    var cloudUploadRes;
    try {
      cloudUploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: BLOGIT_PRESET,
      });
    } catch (error) {
      res.status(500);
      throw new Error("Some problem with cloudinary");
    }

    try {
      const newArticle = await Article.create({
        user: loggedInUser._id,
        body: req.body.body,
        author: loggedInUser.username,
        name,
        imageCloud: cloudUploadRes,
      });

      res.status(200).json(newArticle);
    } catch (error) {
      res.status(500);
      throw new Error("Some Mongo Error occured");
    }
  } else {
    console.log("Only text found");

    try {
      const newArticle = await Article.create({
        user: loggedInUser._id,
        body: req.body.body,
        author: loggedInUser.username,
        name,
        imageCloud: {
          url: "",
        },
      });

      res.status(200).json(newArticle);
    } catch (error) {
      res.status(500);
      throw new Error("Some Mongo Error occured");
    }
  }
});

const updateArticle = asyncHandler(async (req, res) => {
  const articledId = req.params.id;
  const { body, commentId } = req.body;
  const loggedInUser = req.user;

  if (!articledId) {
    res.status(400);
    throw new Error("Please add article id to params");
  }

  if (!body) {
    res.status(400);
    throw new Error("Text body not found");
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

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { body },
      { new: true }
    );

    if (updatedArticle) {
      res.status(200);
      res.json({ updatedArticle });
    } else {
      res.status(400);
      throw new Error("Article could not be updated");
    }
  } else if (commentId == -1) {
    console.log("Comment Id: -1");
    const newComment = {
      user: loggedInUser._id,
      username: loggedInUser.username,
      comment: body,
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
      comment: body,
    };

    article.comments[commentFoundIdx] = updatedComment;

    await article.save();

    res.status(200);
    res.json({ article });
  }
});

module.exports = {
  getArticlesByRequestedUsers,
  getArticles,
  postArticle,
  updateArticle,
};
