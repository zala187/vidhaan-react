const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const {
  clientOrigin,
} = require("./config/env");

const authRoutes = require("./routes/authRoutes");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();


// =========================
// CORS
// =========================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin
      // e.g. Postman/server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked: ${origin}`)
      );
    },
    credentials: true,
  })
);


// =========================
// MIDDLEWARE
// =========================

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));


// =========================
// HEALTH
// =========================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    service: "vidhaan-backend",
  });
});


// =========================
// AUTH ROUTES
// =========================

app.use(
  "/api/auth",
  authRoutes
);


// =========================
// ERROR HANDLING
// =========================

app.use(notFound);

app.use(errorHandler);


module.exports = app;