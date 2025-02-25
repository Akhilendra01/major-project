require('dotenv').config();

const mongoose=require('mongoose');

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error while connecting to database... ", err);
  });

module.exports=mongoose.connection;