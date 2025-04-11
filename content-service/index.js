require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors= require("cors");
const router = require("./router");
const db = require("./db");
const verifyToken = require("./middlewares/token-verify");
const {storage}=require("./cloudinary");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(verifyToken);
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Content service running on port [ ${process.env.PORT} ]`);
});
