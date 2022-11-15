const mongoose = require("mongoose");
const { DEFAULT_HEADLINE } = require("../constants/constants");

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
