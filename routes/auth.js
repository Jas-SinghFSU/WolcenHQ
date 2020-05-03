const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");
const Mongo = require("mongodb");
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const USERS = db.collection("Users");
const { ensureUnauthenticated } = require("../Shared/ensureAuthenticated");
const validator = require("validator");

const { ObjectID } = Mongo;

router.get("/", function (req, res) {
  if (res.locals.user) {
    res.json(res.locals.user);
  } else {
    res.json({});
  }
});

router.get(
  "/steam",
  ensureUnauthenticated,
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    // If env var is defined as dev then describe dev, otherwise assume prod
    const env = process.env.NODE_ENV || "dev";
    if (env === "production") {
      return res.redirect("https://www.wolcenhq.com/");
    } else {
      return res.redirect("http://localhost:3000");
    }
  }
);

router.get(
  "/steam/return",
  passport.authenticate("steam", {
    failureRedirect: "/",
    session: true,
  }),
  function (req, res) {
    // If env var is defined as dev then describe dev, otherwise assume prod
    const env = process.env.NODE_ENV || "dev";
    if (env === "production") {
      return res.redirect("https://www.wolcenhq.com/");
    } else {
      return res.redirect("http://localhost:3000");
    }
  }
);

router.post("/register", ensureUnauthenticated, async function (
  req,
  res,
  next
) {
  const { email, username, password, password2 } = req.body;
  const errorsArray = [];

  if (_.isEmpty(email)) {
    errorsArray.push("Email is required.");
  }

  if (!validator.isEmail(email)) {
    return res.status(500).send({ error: "E-Mail is not a valid format." });
  }

  if (_.isEmpty(username)) {
    errorsArray.push("Username is required.");
  }
  if (_.isEmpty(password)) {
    errorsArray.push("Password is required.");
  }
  if (_.isEmpty(password2)) {
    errorsArray.push("You must confirm your password.");
  }

  if (errorsArray.length > 0) {
    return res.status(500).send({ errors: errorsArray });
  }

  if (password !== password2) {
    return res.status(500).send({ error: "Passwords do not match." });
  }

  try {
    passport.authenticate("local-register", { session: true }, async function (
      err,
      user,
      info
    ) {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (user) {
        const userWithEmail = await USERS.findOneAndUpdate(
          { _id: user[0]._id },
          { $set: { email: email } },
          { returnOriginal: false }
        );
        req.logIn([userWithEmail.value], function (err) {
          if (err) {
            return next(err);
          }
          // If env var is defined as dev then describe dev, otherwise assume prod
          const env = process.env.NODE_ENV || "dev";
          if (env === "production") {
            return res.redirect("https://www.wolcenhq.com/");
          } else {
            return res.redirect("http://localhost:3000");
          }
        });
      }
    })(req, res, next);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/login", ensureUnauthenticated, async function (req, res, next) {
  const { username, password } = req.body;
  const errorsArray = [];

  if (_.isEmpty(username)) {
    errorsArray.push("Username is required.");
  }
  if (_.isEmpty(password)) {
    errorsArray.push("Password is required.");
  }

  if (errorsArray.length > 0) {
    return res.status(500).send({ errors: errorsArray });
  }

  try {
    passport.authenticate("local-login", { session: true }, async function (
      err,
      user,
      info
    ) {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (user) {
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          // If env var is defined as dev then describe dev, otherwise assume prod
          const env = process.env.NODE_ENV || "dev";
          if (env === "production") {
            return res.redirect("https://www.wolcenhq.com/");
          } else {
            return res.redirect("http://localhost:3000");
          }
        });
      }
    })(req, res, next);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/logout", (req, res) => {
  try {
    req.logout();
    res.json({
      status: "success",
      data: "Logout successful.",
    });
  } catch (error) {
    return res.status(400).send({ error: "Failed to logout." });
  }
});

module.exports = router;
