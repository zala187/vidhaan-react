const express = require("express");

const {
  register,
  login,
  getMe,
  updateMe,
  logout,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  loginRateLimiter,
} = require("../middleware/rateLimiter");

const router = express.Router();

// Public
router.post("/register", register);

router.post(
  "/login",
  loginRateLimiter,
  login
);

// Protected
router.get(
  "/me",
  protect,
  getMe
);

router.put(
  "/me",
  protect,
  updateMe
);

router.post(
  "/logout",
  protect,
  logout
);

module.exports = router;