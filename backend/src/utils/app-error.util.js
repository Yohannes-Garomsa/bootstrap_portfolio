class AppError extends Error {
  constructor(message, statusCode = 500, details = null, expose = true) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;
    this.expose = expose;
  }
}

module.exports = AppError;
