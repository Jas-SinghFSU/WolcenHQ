const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", function(req, res) {
  if (res.locals.user) {
    res.json(res.locals.user);
  } else {
    res.json({});
  }
});

router.get(
  "/steam",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/");
  }
);

router.get(
  "/steam/return",
  passport.authenticate("steam", { failureRedirect: "/", session: true }),
  function(req, res) {
    res.redirect(`http://localhost:3000`);
  }
);

router.get("/logout", (req, res) => {
  try {
    req.logout();
    res.json({
      status: "success",
      data: "Logout successful."
    });
  } catch (error) {
    return res.status(400).json({ error: "Failed to logout." });
  }
});

module.exports = router;
