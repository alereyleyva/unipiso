const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) res.status(401).json({ message: "No token provided" });

  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN);
    if (!verifiedUser) res.json({ message: "Invalid Token" });
    next();
  } catch (err) {
    res.json({ message: "Invalid Token" });
  }
};
