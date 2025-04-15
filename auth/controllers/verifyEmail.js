const User = require("../models/User");

async function verifyEmail(req, res) {
  const { token, user: userId } = req.query;

  if (!token || !userId) {
    return res.status(400).send(`
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>Invalid Verification Link</h1>
        <p>Please check your email for the correct link.</p>
      </div>
    `);
  }

  const userToVerify = await User.findOne({ _id: userId, emailToken: token });
  if (!userToVerify) {
    return res.status(400).send(`
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>Invalid or Expired Link</h1>
        <p>The verification link is invalid or has expired. Please request a new verification email.</p>
      </div>
    `);
  }

  userToVerify.isVerified = true;
  userToVerify.emailToken = undefined; // clear token after verification
  await userToVerify.save();

  return res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1>Email Verified Successfully!</h1>
      <p>Your email has been verified. You can now <a href="http://localhost:5173/login">login</a>.</p>
    </div>
  `);
}

module.exports = verifyEmail;