const Profile = require("../models/Profile");

async function createProfile(username, email) {
  const profile = new Profile({
    username: username,
    email: email,
  });
  await profile.save();
}

async function getProfile(req, res) {
  const profile = await Profile.findOne({ username: req.params.username });
  if (!profile) {
    if (req.user.username !== req.params.username) {
      return res.status(404).send({
        status: 404,
        message: "Profile not found",
      });
    } else {
      await createProfile(req.user.username, req.user.email);
      profile = await Profile.findOne({ username: req.user.username });
    }
  }

  return res.send({
    status: 200,
    data: {
      profile: profile,
    },
  });
}

async function updateProfile(req, res) {
  const profile = await Profile.findOne({ username: req.body.username });
  if (!profile) {
    return res.status(404).send({ status: 404, message: "Profile not found" });
  }

  if (req.user.username !== req.body.username) {
    return res.status(403).send({ status: 403, message: "Unauthorized" });
  }

  const { skills, username, ...otherFields } = req.body;

  const updateQuery = {
    $set: {
      ...otherFields,
      lastUpdated: new Date(),
    },
  };

  if (skills && Array.isArray(skills)) {
    updateQuery.$push = {
      skills: { $each: skills },
    };
  }

  const updatedProfile = await Profile.findByIdAndUpdate(
    profile._id,
    updateQuery,
    { new: true }
  );

  return res.send({
    status: 200,
    data: {
      profile: updatedProfile,
    },
  });
}

module.exports = {
  getProfile,
  updateProfile,
};
