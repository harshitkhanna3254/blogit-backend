const mongoose = require("mongoose");
const { DEFAULT_HEADLINE, DUMMY_IMAGE_URL } = require("../constants/constants");

const followingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Please add a username"],
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    avatar: {
      type: Object,
    },
  },
  { timestamps: true }
);

const imageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: { data: Buffer, contentType: String },
  },
  {
    timestamps: true,
  }
);

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please add a phone number"],
    },
    following: [followingSchema],
    zipcode: {
      type: Number,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    avatar: {
      type: String,
      default: DUMMY_IMAGE_URL,
    },
    avatarCloud: {
      type: Object,
    },
    headline: {
      type: String,
      default: DEFAULT_HEADLINE,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
