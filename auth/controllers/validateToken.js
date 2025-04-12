require("dotenv").config();
const jwt = require("jsonwebtoken");

async function ValidateToken(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const ok=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.send({
      data:{
        user:{
          id: ok.id,
          username: ok.username,
          email: ok.email,
          isAdmin: ok.isAdmin,
        }
      }
    });
  } catch (err) {
    res.send({
      data: err
    });
  }
}

module.exports = ValidateToken;
