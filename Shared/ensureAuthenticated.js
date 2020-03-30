const ensureAuthenticated = (req, res, next) => {
  // Use passports isAuthenticated api
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

module.exports = {
  ensureAuthenticated
};
