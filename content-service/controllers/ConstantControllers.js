const Company = require("../models/Company");
const Position = require("../models/Positions");

async function getConstants(req, res) {
  const companies = await Company.find();
  const positions = await Position.find();
  res.send({
    status: 200,
    data: {
      companies: companies,
      positions: positions,
    },
  });
}

module.exports = {
  getConstants,
};