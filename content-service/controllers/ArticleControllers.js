const Article = require("../models/Article");

async function createArticle(req, res) {
  const { title, content, author, roleTag, companyTag } = req.body;
  const article = new Article({ title, content, author, roleTag, companyTag});
  await article.save();
  return res.json(article);
}

async function getArticles(req, res) {
  const articles = await Article.find({
    companyTag: req.query.companyTag,
    roleTag: req.query.roleTag,
    $gte: { createdAt: new Date(year, 0, 1).getTime() },
  });
  return res.status(200).json(articles);
}

module.exports={
    createArticle,
    getArticles
}