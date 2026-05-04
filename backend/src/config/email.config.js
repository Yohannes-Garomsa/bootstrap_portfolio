const { getServerConfig } = require("./env.config");

function getEmailConfig() {
  const serverConfig = getServerConfig();

  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM,
    ownerEmail: process.env.CONTACT_RECEIVER_EMAIL,
    allowAutoReply: process.env.ENABLE_AUTO_REPLY !== "false",
    nodeEnv: serverConfig.nodeEnv,
  };
}

module.exports = {
  getEmailConfig,
};
