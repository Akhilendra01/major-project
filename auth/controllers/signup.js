const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

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

  const emailToken = crypto.randomBytes(32).toString("hex");
  const encPassword = bcrypt.hashSync(password, 5);
  const user = new User({
    username: username,
    password: encPassword,
    email: email,
    emailToken: emailToken,
    isVerified: false,
  });
  await user.save();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verifyLink = `${process.env.EMAIL_VERIFY_LINK_BASE}/verify-email?token=${emailToken}&user=${user._id}`;

  await transporter.sendMail({
    from: '"Campus Portal" <no-reply@campusportal.com>',
    to: email,
    subject: "Verify your email",
    text: `Welcome! Please click the following link to verify your email: ${verifyLink}`,
    html: `<p>Welcome!</p><p>Please click <a href="${verifyLink}">here</a> to verify your email.</p>`,
  });

  res.send({
    status: 201,
    message: "User created successfully. Please verify your email.",
  });
}

module.exports = SignupController;
