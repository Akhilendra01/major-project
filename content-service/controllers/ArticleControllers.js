const Article = require("../models/Article");

async function createArticle(req, res) {
  req.body.tags = JSON.parse(req.body.tags);
  console.log("Uploaded files: ", req.files);
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

module.exports = {
  createArticle,
  getArticles,
};
