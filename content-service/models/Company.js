const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  industry: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("company", companySchema);