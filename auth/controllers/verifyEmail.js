const User = require("../models/User");

async function verifyEmail(req, res) {
  const { token, user: userId } = req.query;

  if (!token || !userId) {
    return res.status(400).send({
      status: 400,
      message: "Invalid verification link.",
    });
  }

  const userToVerify = await User.findOne({ _id: userId, emailToken: token });
  if (!userToVerify) {
    return res.status(400).send({
      status: 400,
      message: "Invalid or expired verification link.",
    });
  }

  userToVerify.isVerified = true;
  userToVerify.emailToken = undefined; // clear token after verification
  await userToVerify.save();

  return res.send({
    status: 200,
    message: "Email verified successfully.",
  });
}

module.exports = verifyEmail;