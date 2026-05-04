const AppError = require("../utils/app-error.util");
const { getServerConfig } = require("../config/env.config");

function buildAllowedOrigins() {
  return getServerConfig().clientUrls;
}

const allowedOrigins = buildAllowedOrigins();

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new AppError("Origin not allowed by CORS.", 403, null, false));
  },
};

module.exports = corsOptions;
