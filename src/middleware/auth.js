const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ msg: "Invalid Authentication" });
};

module.exports = auth;
