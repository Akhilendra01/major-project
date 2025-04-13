const express = require("express");

const router = express.Router();

const multer=require("multer");
const { storage } = require("../cloudinary/index.js");
const upload = multer({ storage: storage });



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

router.post("/create-post", upload.array("images"),createPost);
router.get("/get-post", getPost);
router.delete("/delete-post", deletePost);
router.get("/constants", getConstants);
router.post("/create-article", createArticle);
router.get("/get-articles", getArticles);
router.get("/get-profile/:username", getProfile);
router.put("/update-profile", updateProfile);
router.post("/update-avatar", upload.single("avatar"), updateAvatar);

module.exports = router;
