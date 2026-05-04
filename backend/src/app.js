const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { getServerConfig } = require("./config/env.config");
const { getDatabaseStatus } = require("./config/db.config");
const contactRoutes = require("./routes/contact.routes");
const corsOptions = require("./middleware/cors-options.middleware");
const errorHandler = require("./middleware/error-handler.middleware");
const notFoundHandler = require("./middleware/not-found.middleware");

const app = express();
const serverConfig = getServerConfig();

app.set("trust proxy", 1);

app.disable("x-powered-by");
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(express.json({ limit: serverConfig.requestBodyLimit }));

app.get("/api/health", (_req, res) => {
  const database = getDatabaseStatus();
  const isHealthy = database.status === "connected";
  const isProduction = serverConfig.nodeEnv === "production";

  const payload = {
    status: isHealthy ? "ok" : "degraded",
    message: "Contact backend is running.",
  };

  if (!isProduction) {
    payload.environment = serverConfig.nodeEnv;
    payload.uptimeSeconds = Math.round(process.uptime());
    payload.timestamp = new Date().toISOString();
    payload.database = database;
  }

  res.status(isHealthy ? 200 : 503).json(payload);
});

app.use("/api/contact", contactRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
