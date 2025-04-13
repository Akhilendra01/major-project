const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  images:{
    type: [String],
    default: []
  },
  tags:{
    type: [String],
    default: [] 
  },
  
  timestamp: {
    type: Date,
    default: Date.now
  },

  impressions: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("post", postSchema);
