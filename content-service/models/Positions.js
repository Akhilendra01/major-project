const mongoose = require("mongoose");

const positionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  avgSalary: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("position", positionSchema);