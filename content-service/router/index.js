const express = require("express");

const router = express.Router();

const {
  createPost,
  deletePost,
  getPost,
} = require("../controllers/PostControllers");

const { getConstants } = require("../controllers/ConstantControllers");

const {
  createArticle,
  getArticles,
} = require("../controllers/ArticleControllers");
const {
  getProfile,
  updateProfile,
} = require("../controllers/ProfileControllers");

router.post("/create-post", createPost);
router.get("/get-post", getPost);
router.delete("/delete-post", deletePost);
router.get("/constants", getConstants);
router.post("/create-article", createArticle);
router.get("/get-articles", getArticles);
router.get("/get-profile/:username", getProfile);
router.post("/update-profile", updateProfile);

module.exports = router;
