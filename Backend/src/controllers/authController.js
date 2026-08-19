const User = require("../models/User");

const {
  hashPassword,
  comparePassword,
} = require("../utils/password");

const {
  generateToken,
} = require("../utils/token");

const {
  validateRegister,
  validateLogin,
} = require("../utils/validators");

const asyncHandler = require("../utils/asyncHandler");

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;

const getPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  org: user.org,
  role: user.role,
  status: user.status,
  lastLoginAt: user.lastLoginAt,
  loginCount: user.loginCount,
});

// REGISTER
const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    org,
  } = req.body;

  const errors = validateRegister({
    name,
    email,
    password,
  });

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      errors,
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists.",
    });
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    org: org?.trim() || "",
    role: "USER",
    status: "ACTIVE",
  });

  const token = generateToken(user);

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "Account created successfully.",
    user: getPublicUser(user),
  });
});

// LOGIN
const login = asyncHandler(async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const errors = validateLogin({
    email,
    password,
  });

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      errors,
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+passwordHash");

  // Same generic error
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Incorrect email or password.",
    });
  }

  // Check lock
  if (
    user.lockedUntil &&
    user.lockedUntil > new Date()
  ) {
    return res.status(423).json({
      success: false,
      message:
        "Too many failed attempts. Account temporarily locked.",
    });
  }

  // Check status
  if (user.status !== "ACTIVE") {
    return res.status(403).json({
      success: false,
      message: "This account is not active.",
    });
  }

  // Password check
  const passwordCorrect = await comparePassword(
    password,
    user.passwordHash
  );

  // Wrong password
  if (!passwordCorrect) {
    user.failedLoginAttempts += 1;

    if (
      user.failedLoginAttempts >=
      MAX_LOGIN_ATTEMPTS
    ) {
      user.lockedUntil = new Date(
        Date.now() + LOCK_TIME
      );

      user.failedLoginAttempts = 0;
    }

    await user.save();

    return res.status(401).json({
      success: false,
      message: "Incorrect email or password.",
    });
  }

  // Successful login
  user.failedLoginAttempts = 0;
  user.lockedUntil = null;
  user.lastLoginAt = new Date();
  user.lastActiveAt = new Date();
  user.loginCount += 1;

  await user.save();

  // Create JWT
  const token = generateToken(user);

  // HttpOnly cookie
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    user: getPublicUser(user),
  });
});

// GET CURRENT USER
const getMe = asyncHandler(async (req, res) => {
  return res.json({
    success: true,
    user: getPublicUser(req.user),
  });
});

// UPDATE PROFILE
const updateMe = asyncHandler(async (req, res) => {
  const {
    name,
    org,
  } = req.body;

  const updates = {};

  if (name !== undefined) {
    updates.name = name.trim();
  }

  if (org !== undefined) {
    updates.org = org.trim();
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.json({
    success: true,
    user: getPublicUser(user),
  });
});

// LOGOUT
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.json({
    success: true,
    message: "Logged out successfully.",
  });
});

module.exports = {
  register,
  login,
  getMe,
  updateMe,
  logout,
};