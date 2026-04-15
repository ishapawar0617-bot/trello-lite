const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json("No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;

    next();
  } catch (error) {
    res.status(401).json("Invalid token");
  }
};

module.exports = authMiddleware;