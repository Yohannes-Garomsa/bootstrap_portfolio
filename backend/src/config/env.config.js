const requiredEnvVars = [
  "MONGODB_URI",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "MAIL_FROM",
  "CONTACT_RECEIVER_EMAIL",
];

function validateEnvironment() {
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar] || String(process.env[envVar]).trim() === ""
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
  }
}

function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT || 5000),
    clientUrl: process.env.CLIENT_URL || "",
    clientUrls: (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
    healthcheckToken: process.env.HEALTHCHECK_TOKEN || "",
    requestBodyLimit: process.env.REQUEST_BODY_LIMIT || "10kb",
  };
}

module.exports = {
  getServerConfig,
  validateEnvironment,
};
