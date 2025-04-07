const axios = require("axios");

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }

    const response = await axios.post(
      `${process.env.AUTH_SERVER_URL}/validate`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    req.user = response.data.data.user;
    
    next(); 
  } catch (error) {
    return res.status(403).json({
      message: "Invalid Token",
    });
  }
}

module.exports = verifyToken;
