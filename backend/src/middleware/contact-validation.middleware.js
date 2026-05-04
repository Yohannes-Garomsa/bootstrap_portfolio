const { body } = require("express-validator");

const contactValidationRules = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must be between 2 and 80 characters."),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("A valid email address is required."),
  body("subject")
    .trim()
    .escape()
    .isLength({ min: 3, max: 120 })
    .withMessage("Subject must be between 3 and 120 characters."),
  body("message")
    .trim()
    .escape()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters."),
  body("website")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 0 })
    .withMessage("Invalid honeypot value."),
];

module.exports = contactValidationRules;
