const {
  sendOwnerNotification,
  sendAutoReply,
} = require("../services/email.service");
const Message = require("../models/message.model");
const AppError = require("../utils/app-error.util");
const asyncHandler = require("../utils/async-handler.util");
const { logWarn } = require("../utils/logger.util");

const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const ipAddress = req.ip || req.socket.remoteAddress || null;

  const savedMessage = await Message.create({
    name,
    email,
    subject,
    message,
    ipAddress,
  });

  let emailStatus = "skipped";

  try {
    await sendOwnerNotification({ name, email, subject, message });
    await sendAutoReply({ name, email, subject });
    emailStatus = "sent";
  } catch (error) {
    logWarn("Email delivery failed.", { message: error.message });
    emailStatus = "failed";
  }

  if (!savedMessage) {
    throw new AppError("Failed to create contact message.", 500, null, false);
  }

  return res.status(200).json({
    success: true,
    message: "Contact request received successfully.",
    emailStatus,
    data: {
      name,
      email,
      subject,
      message,
      receivedAt: savedMessage.createdAt,
    },
  });
});

module.exports = {
  createContactMessage,
};
