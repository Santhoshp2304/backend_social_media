 const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(404).json({ msg: "Token not found" });
    }
    const user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({ msg: "Unable to verify Token " });
  }
};

module.exports = auth;
