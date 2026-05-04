const rateLimit = require("express-rate-limit");

const contactRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact requests from this IP. Please try again in a minute.",
  },
});

module.exports = {
  contactRateLimiter,
};
