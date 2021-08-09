const { findById } = require("../models/userModel");
const User = require("../models/userModel");
const authAdmin = async (req, res, next) => {
  try {
    if (!req.user.role)
      return res.status(401).json({ msg: "Admin resources access denied" });
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = authAdmin;
