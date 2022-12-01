const mongoose = require("mongoose");
const { DUMMY_IMAGE_URL } = require("../constants/constants");

//Schema for comments on each Article
const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const articleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    author: {
      type: String,
      required: [true, "Please add author username"],
    },
    name: {
      type: String,
      required: [true, "Please add author name"],
    },
    body: {
      type: String,
      required: [true, "Please add post body"],
    },
    image: {
      type: String,
      default: DUMMY_IMAGE_URL,
    },
    imageCloud: {
      type: Object,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
