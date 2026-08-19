const jwt = require("jsonwebtoken");

const {
  jwtSecret,
  jwtExpiresIn,
} = require("../config/env");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: String(user._id),
      role: user.role,
    },
    jwtSecret,
    {
      expiresIn: jwtExpiresIn,
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};