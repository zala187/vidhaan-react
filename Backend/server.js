const mongoose = require("mongoose");

const app = require("./src/app");

const {
  port,
  mongoUri,
} = require("./src/config/env");

const startServer = async () => {
  try {
    if (!mongoUri) {
      throw new Error(
        "MONGO_URI is missing in .env"
      );
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(
        `Vidhaan backend running on http://localhost:${port}`
      );
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();