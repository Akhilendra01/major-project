const express = require("express");

const router = express.Router();

const multer = require("multer");
const {
  profilePhotoStorage,
  postsPhotoStorage,
} = require("../cloudinary/index.js");
const profilePhotoUpload = multer({ storage: profilePhotoStorage });
const postsPhotoUpload = multer({ storage: postsPhotoStorage });

const {
  createPost,
  deletePost,
  getPost,
} = require("../controllers/PostControllers");

const { getConstants } = require("../controllers/ConstantControllers");

const {
  createArticle,
  getArticles,
  getArticleForFeed,
  getTrendingTags,
  upvote,
  downvote,
  getTaggedArticles,
} = require("../controllers/ArticleControllers");
const {
  getProfile,
  updateProfile,
  updateAvatar,
  getFollowRecommendation,
} = require("../controllers/ProfileControllers");

router.post("/create-post", postsPhotoUpload.array("images", 3), createPost);
router.post(
  "/create-article",
  postsPhotoUpload.array("images", 3),
  createArticle
);
router.post(
  "/update-avatar",
  profilePhotoUpload.single("avatar"),
  updateAvatar
);
router.post("/get-tagged-articles", getTaggedArticles);

router.put("/update-profile", updateProfile);

router.get("/get-post", getPost);
router.get("/constants", getConstants);
router.get("/get-articles", getArticles);
router.get("/get-profile/:username", getProfile);
router.get("/feed", getArticleForFeed);
router.get("/get-trending-tags", getTrendingTags);
router.get("/get-follow-recommendations", getFollowRecommendation);
router.get("/upvote/:id", upvote);
router.get("/downvote/:id", downvote);

router.delete("/delete-post", deletePost);

module.exports = router;
