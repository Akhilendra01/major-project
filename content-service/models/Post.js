const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  applyLink: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
