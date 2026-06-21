const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer "))
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });

  try {
    const cleanToken = token.slice(7);

    const verified = jwt.verify(cleanToken, secret);

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. Admin Privileges required" });
  }
};

module.exports = { verifyToken, verifyAdmin };
