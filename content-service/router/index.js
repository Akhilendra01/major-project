const express = require("express");

const router = express.Router();

const {
  createPost,
  deletePost,
  getPost,
} = require("../controllers/PostControllers");

router.post("/create-post", createPost);
router.get("/get-post", getPost);
router.delete("/delete-post", deletePost);

module.exports = router;
