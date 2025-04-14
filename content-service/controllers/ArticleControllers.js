const Article = require("../models/Article");

async function createArticle(req, res) {
  req.body.tags = JSON.parse(req.body.tags);
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

module.exports = {
  createArticle,
  getArticles,
  getArticleForFeed,
};
