const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("mongoose");

const Article = require("../schema/articleSchema");

const getArticles = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  console.log(loggedInUser);
  const id = req.params.id;

  if (id) {
    if (isValidObjectId(id)) {
      //Id is an Article Id (MongoDB Object)

      try {
        var articles = [];
        const article = await Article.findById(id);
        articles.push(article);
        res.status(200);
        res.json({ articles });
      } catch (error) {
        res.status(401);
        throw new Error("Unable to find the article with the requested id");
      }
    } else {
      //Id is a username
      try {
        const articles = await Article.find({ username: id });
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
    user: loggedInUser.id,
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
  console.log(article);
  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }

  if (article.user.toString() !== loggedInUser.id) {
    res.status(401);
    throw new Error("User not authorized to update this article");
  }

  try {
    if (!commentId) {
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
    }
    // else {
    //   const updatedComment = {
    //     user: loggedInUser._id,
    //     name: loggedInUser.name,
    //     comment: text,
    //   };

    //   const allComments = article.comments;

    //   const ogComment = allComments.find((comment) => {
    //     return comment._id == commentId;
    //   });

    //   allComments[ogCommentId] = updatedComment;

    //   const updatedArticle = await Article.findByIdAndUpdate(
    //     articledId,
    //     { comments: allComments },
    //     { new: true }
    //   );

    //   res.status(200);
    //   res.json({ article: updatedArticle });
    // }
  } catch (error) {
    res.status(400);
    throw new Error("Some error occured");
  }
});

module.exports = {
  getArticles,
  postArticle,
  updateArticle,
};
