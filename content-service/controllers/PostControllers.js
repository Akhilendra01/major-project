const Post = require("../models/Post");

async function createPost(req, res) {
  const user = req.user;
  const post = new Post({
    author: user.username,
    companyName: req.body.companyName,
    jobDescription: req.body.jobDescription,
    images: req.files.map((file) => file.path),
    applyLink: req.body.applyLink,
  });

  await post.save();

  res.status(201).send({
    status: 201,
    message: "Post created successfully",
  });
}

async function getPost(req, res) {
  const post = await Post.findById(req.params.id);
  res.send({
    status: 200,
    data: {
      post: post,
    },
  });
}

async function deletePost(req, res) {
  const post = await Post.findById(req.params.id);
  if (post.author === req.user.username) {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(403).json({ message: "Unauthorised" });
  }
}

async function getPostForFeed(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    console.log(await Post.find({}));
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles" });
  }
}

module.exports = {
  createPost,
  getPost,
  deletePost,
  getPostForFeed
};
