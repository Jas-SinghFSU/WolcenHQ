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

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get(
  "/steam",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/");
  }
);

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
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
