const jwt = require("jsonwebtoken");
const { unless } = require("express-unless");   // 👈 yahan curly braces lagani zaroori hain

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};

// 👇 ab middleware par `.unless` attach ho jayega
authenticate.unless = unless;

module.exports = authenticate;
