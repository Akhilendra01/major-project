const Article = require("../models/Article");
const Embedding = require("../models/Embedding");
const { getEmbeddings, getEmbeddingsForQuery } = require("./utilities");

require("dotenv").config();

async function searchArticles(req, res) {
  const q = req.query.q;
  const queryEmbedding = await getEmbeddingsForQuery(q);
  const similarEmbeddings = await Embedding.aggregate([
    {
      $vectorSearch: {
        // Name of the Atlas Vector Search index to use.
        index: "embedding_index",
        // Indexed vectorEmbedding type field to search.
        path: "embedding",
        // Array of numbers that represent the query vector.
        // The array size must match the number of vector dimensions specified in the index definition for the field.
        queryVector: queryEmbedding,
        // Number of nearest neighbors to use during the search.
        // Value must be less than or equal to (<=) 10000.
        numCandidates: 50,
        limit: 10,
        // Any MQL match expression that compares an indexed field with a boolean,
        // number (not decimals), or string to use as a prefilter.
        filter: {},
      },
    },
    { $project: { score: { $meta: "vectorSearchScore" }, articleId: 1 } },
  ]);

  const articleIds = similarEmbeddings.map((doc) => doc.articleId);
  console.log(similarEmbeddings)
  const articles = await Article.find({ _id: { $in: articleIds } });
  const articlesMap = new Map(
    articles.map((article) => [article._id.toString(), article])
  );
  const sortedArticles = articleIds.map((id) => articlesMap.get(id.toString()));

  res.status(200).send({
    data: {
      articles: sortedArticles,
    },
  });
}

async function createArticle(req, res) {
  req.body.tags = JSON.parse(req.body.tags);
  const embedding = await getEmbeddings(req.body);
  const article = new Article({
    author: req.user.username,
    ...req.body,
    images: req.files.map((file) => file.path),
  });
  await article.save();

  const embeddingObj = new Embedding({
    articleId: article._id,
    embedding: embedding,
  });

  await embeddingObj.save();

  return res.status(200).send({
    data: article,
  });
}

async function getArticles(req, res) {
  const articles = await Article.find({
    companyTag: req.query.companyTag,
    roleTag: req.query.roleTag,
    $gte: { createdAt: new Date(year, 0, 1).getTime() },
  });
  return res.status(200).json(articles);
}

async function getArticleForFeed(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles" });
  }
}

async function getTrendingTags(req, res) {
  const response = await Article.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
  res.status(200).send({ data: response.map((tags) => tags._id) });
}

async function upvote(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const hasUpvoted = article.upvoteUserIds.includes(userId);
    const hasDownvoted = article.downvoteUserIds.includes(userId);

    let update = { $set: { updatedAt: new Date() } };

    if (hasUpvoted) {
      // Toggle off upvote
      update.$inc = { upvotes: -1 };
      update.$pull = { upvoteUserIds: userId };
    } else {
      update.$inc = { upvotes: 1 };
      update.$push = { upvoteUserIds: userId };

      if (hasDownvoted) {
        // Remove downvote if switching
        update.$inc.downvotes = -1;
        if (!update.$pull) update.$pull = {};
        update.$pull.downvoteUserIds = userId;
      }
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(200).json({
      data: {
        upvotes: updatedArticle.upvotes,
        downvotes: updatedArticle.downvotes,
      },
    });
  } catch (err) {
    console.error("Upvote error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function downvote(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const hasDownvoted = article.downvoteUserIds.includes(userId);
    const hasUpvoted = article.upvoteUserIds.includes(userId);

    let update = { $set: { updatedAt: new Date() } };

    if (hasDownvoted) {
      // Toggle off downvote
      update.$inc = { downvotes: -1 };
      update.$pull = { downvoteUserIds: userId };
    } else {
      update.$inc = { downvotes: 1 };
      update.$push = { downvoteUserIds: userId };

      if (hasUpvoted) {
        // Remove upvote if switching
        update.$inc.upvotes = -1;
        if (!update.$pull) update.$pull = {};
        update.$pull.upvoteUserIds = userId;
      }
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(200).json({
      data: {
        upvotes: updatedArticle.upvotes,
        downvotes: updatedArticle.downvotes,
      },
    });
  } catch (err) {
    console.error("Downvote error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getTaggedArticles(req, res) {
  const requestTags = req.body.tags;

  if (!Array.isArray(requestTags)) {
    return res.status(400).json({ error: "tags must be an array" });
  }

  try {
    const articles = await Article.aggregate([
      {
        $addFields: {
          matchedTagsCount: {
            $size: {
              $setIntersection: ["$tags", requestTags],
            },
          },
        },
      },
      {
        $match: {
          matchedTagsCount: { $gt: 0 },
        },
      },
      {
        $sort: {
          matchedTagsCount: -1,
          upvotes: -1,
        },
      },
      { $limit: 5 },
    ]);

    res.status(200).json({ articles });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createArticle,
  getArticles,
  getArticleForFeed,
  getTrendingTags,
  getTaggedArticles,
  searchArticles,
  upvote,
  downvote,
};
