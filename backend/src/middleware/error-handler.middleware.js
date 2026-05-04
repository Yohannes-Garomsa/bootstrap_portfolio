const { getServerConfig } = require("../config/env.config");
const { logError } = require("../utils/logger.util");

function errorHandler(error, req, res, _next) {
  const statusCode = error.statusCode || res.statusCode || 500;
  const safeStatusCode = statusCode >= 400 ? statusCode : 500;
  const { nodeEnv } = getServerConfig();

  const payload = {
    success: false,
    message:
      error.expose === false && safeStatusCode >= 500
        ? "Internal server error."
        : error.message || "Internal server error.",
  };

  if (error.details) {
    payload.errors = error.details;
  }

  if (nodeEnv !== "production") {
    payload.stack = error.stack;
  }

  logError(`${req.method} ${req.originalUrl}`, {
    message: error.message,
    statusCode: safeStatusCode,
  });

  return res.status(safeStatusCode).json(payload);
}

module.exports = errorHandler;
