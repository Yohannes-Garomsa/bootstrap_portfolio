const nodemailer = require("nodemailer");

const { getEmailConfig } = require("../config/email.config");
const { logWarn } = require("../utils/logger.util");

function createTransporter() {
  const config = getEmailConfig();

  if (!config.host || !config.user || !config.pass || !config.from || !config.ownerEmail) {
    throw new Error("Email service is not fully configured.");
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

async function sendOwnerNotification({ name, email, subject, message }) {
  const config = getEmailConfig();
  const transporter = createTransporter();

  return transporter.sendMail({
    from: config.from,
    to: config.ownerEmail,
    replyTo: email,
    subject: `Portfolio contact: ${subject}`,
    text: [
      "You received a new portfolio contact message.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });
}

async function sendAutoReply({ name, email, subject }) {
  const config = getEmailConfig();

  if (!config.allowAutoReply) {
    logWarn("Auto reply skipped because ENABLE_AUTO_REPLY is disabled.");
    return null;
  }

  const transporter = createTransporter();

  return transporter.sendMail({
    from: config.from,
    to: email,
    subject: `Re: ${subject}`,
    text: [
      `Hi ${name},`,
      "",
      "Thanks for contacting me through my portfolio.",
      "I received your message and will get back to you as soon as I can.",
      "",
      "Best regards,",
      "Yohannes",
    ].join("\n"),
  });
}

module.exports = {
  createTransporter,
  sendOwnerNotification,
  sendAutoReply,
};
