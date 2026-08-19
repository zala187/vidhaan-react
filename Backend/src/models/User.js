const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    org: {
      type: String,
      default: "",
      trim: true,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "DISABLED"],
      default: "ACTIVE",
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

    lastActiveAt: {
      type: Date,
      default: null,
    },

    loginCount: {
      type: Number,
      default: 0,
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockedUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);