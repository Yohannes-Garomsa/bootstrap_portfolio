const mongoose = require("mongoose");
const { logInfo } = require("../utils/logger.util");

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined.");
  }

  await mongoose.connect(mongoUri);
  logInfo("MongoDB connected successfully.");
}

function getDatabaseStatus() {
  const readyStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return {
    readyState: mongoose.connection.readyState,
    status: readyStates[mongoose.connection.readyState] || "unknown",
  };
}

module.exports = {
  connectDatabase,
  getDatabaseStatus,
};
