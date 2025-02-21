const User = require("../models/User");
const bcrypt = require("bcrypt");

async function SignupController(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const prev = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (prev) {
    res.send({
      status: 409,
      message: "User already exists",
    });
    return;
  }

  const encPassword = bcrypt.hashSync(data=password, saltOrRounds=5);
  const user = new User({
    username: username,
    password: encPassword,
    email: email,
  });
  await user.save();
  res.send({
    status: 201,
    message: "User created successfully",
  });
}

module.exports = SignupController;
