const mongoose = require("mongoose");

const embeddingSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Article",
  },
  embedding: {
    type: [Number],
    required: true,
  },
});

module.exports=mongoose.model('Embedding', embeddingSchema);