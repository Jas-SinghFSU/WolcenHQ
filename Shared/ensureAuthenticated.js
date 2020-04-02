const ensureAuthenticated = (req, res, next) => {
  // Use passports isAuthenticated api
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.sendStatus(401);
  }
};

module.exports = {
  ensureAuthenticated
};
