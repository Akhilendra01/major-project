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
      console.log(data);
      return data.tags;
    });
}

async function createArticle(req, res) {
  req.body.tags = await getTags(req.body);
  const article = new Article({
    author: req.user.username,
    ...req.body,
    images: req.files.map((file) => file.path),
  });
  await article.save();
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

module.exports = {
  createArticle,
  getArticles,
  getArticleForFeed,
  getTrendingTags,
  upvote,
  downvote,
};
