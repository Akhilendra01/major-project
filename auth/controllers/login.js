const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function LoginController(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: { $eq: email } });

  if (!user) {
    res.send({
      status: "404",
      message: "user not exists",
    });
    return;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.send({
      status: 401,
      message: "bad credentials",
    });
    return;
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.send({
    status: 200,
    data: {
      token: token,
      user: user,
    },
    message: "login success",
  });
}
module.exports = LoginController;
