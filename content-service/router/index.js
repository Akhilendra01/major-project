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
} = require("../controllers/ArticleControllers");
const {
  getProfile,
  updateProfile,
  updateAvatar,
} = require("../controllers/ProfileControllers");

router.post("/create-post", postsPhotoUpload.array("images"), createPost);
router.get("/get-post", getPost);
router.delete("/delete-post", deletePost);
router.get("/constants", getConstants);
router.post("/create-article", postsPhotoUpload.array("images"), createArticle);
router.get("/get-articles", getArticles);
router.get("/get-profile/:username", getProfile);
router.put("/update-profile", updateProfile);
router.post(
  "/update-avatar",
  profilePhotoUpload.single("avatar"),
  updateAvatar
);

module.exports = router;
