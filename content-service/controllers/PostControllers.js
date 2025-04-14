const Post = require("../models/Post");

async function createPost(req, res) {
  const user = req.user;
  const post = new Post({
    author: user.username,
    title: req.body.title,
    content: req.body.content,
    images: req.files.map((file) => file.path),
    tags: JSON.parse(req.body.tags),
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

module.exports = {
  createPost,
  getPost,
  deletePost,
};
