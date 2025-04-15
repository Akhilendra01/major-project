const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  // New fields for email verification
  emailToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports=mongoose.model('user', user)
