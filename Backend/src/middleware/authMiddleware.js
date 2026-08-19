const { verifyToken } = require("../utils/token");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Token expired or invalid.",
    });
  }
};

module.exports = {
  protect,
};