const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const { connectDatabase } = require("./config/db.config");
const { getServerConfig, validateEnvironment } = require("./config/env.config");
const { logError, logInfo } = require("./utils/logger.util");

const { port } = getServerConfig();
let server;

async function startServer() {
  try {
    validateEnvironment();
    await connectDatabase();

    server = app.listen(port, () => {
      logInfo(`Server listening on port ${port}`);
    });
  } catch (error) {
    logError("Failed to start server.", { message: error.message });
    process.exit(1);
  }
}

function shutdown(signal) {
  logInfo(`${signal} received. Shutting down gracefully...`);

  if (!server) {
    process.exit(0);
  }

  server.close(() => {
    logInfo("HTTP server closed.");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
