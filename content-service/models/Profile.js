const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    default: "https://avatar.iran.liara.run/public/8",
  },
  bio: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  designation: {
    type: String,
    default: "",
  },
  branch: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  batch: {
    type: Number,
    default: "",
  },
});

module.exports = mongoose.model("Profile", profileSchema);
