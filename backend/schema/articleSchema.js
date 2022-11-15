const mongoose = require("mongoose");

//Schema for comments on each Article
const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
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
      required: [true, "Please add a text value"],
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    comments: [commentSchema],
  },
  {
    _id: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
