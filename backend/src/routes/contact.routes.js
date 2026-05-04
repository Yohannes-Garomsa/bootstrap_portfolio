const express = require("express");

const { createContactMessage } = require("../controllers/contact.controller");
const contactValidationRules = require("../middleware/contact-validation.middleware");
const rejectHoneypot = require("../middleware/honeypot.middleware");
const { contactRateLimiter } = require("../middleware/rate-limit.middleware");
const validateRequest = require("../middleware/validate-request.middleware");

const router = express.Router();

router.post(
  "/",
  contactRateLimiter,
  rejectHoneypot,
  contactValidationRules,
  validateRequest,
  createContactMessage
);

module.exports = router;
