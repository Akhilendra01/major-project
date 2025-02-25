require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const router = require("./router");
const db=require('./db');

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Content service running on port [ ${process.env.PORT} ]`);
});
