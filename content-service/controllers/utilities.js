const Article = require("../models/Article");

require("dotenv").config();

async function getTags(articleData) {
  const prompt = `${articleData.title}\n${articleData.content}`;

  return await fetch(`${process.env.LLM_SERVER_URL}/generate-tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.tags;
    });
}

async function getEmbeddings(articleData) {
  const prompt = `${articleData.title}\n${articleData.content}`;

  return await fetch(`${process.env.GTE_SERVER_URL}/get-embeddings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.embedding;
    });
}

module.exports = {
  getTags,
  getEmbeddings,
};
