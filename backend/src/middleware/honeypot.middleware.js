function rejectHoneypot(req, res, next) {
  const honeypotValue = req.body.website;

  if (typeof honeypotValue === "string" && honeypotValue.trim() !== "") {
    return res.status(400).json({
      success: false,
      message: "Spam protection triggered.",
    });
  }

  return next();
}

module.exports = rejectHoneypot;
