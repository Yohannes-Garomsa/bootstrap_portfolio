const AppError = require("../utils/app-error.util");

function notFoundHandler(req, res, next) {
  res.status(404);
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

module.exports = notFoundHandler;
