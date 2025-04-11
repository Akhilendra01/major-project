require("dotenv").config();
const { v2 } = require("cloudinary");

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "profile-photos",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

async function deleteImage(imageUrl) {
  // extract public_id from URL
  const parts = imageUrl.split("/");
  const fileName = parts.pop().split(".")[0]; // get 'my-avatar' from 'my-avatar.png'
  const folder = parts.slice(-1)[0]; // get folder like 'profile-photos'
  const publicId = `${folder}/${fileName}`;

  try {
    const result = await v2.uploader.destroy(publicId);
    console.log("Deleted:", result);
    return result;
  } catch (err) {
    console.error("Cloudinary deletion error:", err);
    throw err;
  }
}

module.exports = {
  storage,
  deleteImage,
};
