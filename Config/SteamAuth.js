const SteamStrategy = require("passport-steam").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("./default.json");
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const USERS = db.collection("Users");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

module.exports = function (passport) {
  const returnURLString =
    process.env.NODE_ENV === "production"
      ? "https://wolcen-hq.herokuapp.com/api/auth/steam/return"
      : "http://localhost:3443/api/auth/steam/return";

  const realmString =
    process.env.NODE_ENV === "production"
      ? "https://wolcen-hq.herokuapp.com/"
      : "http://localhost:3443/";
  passport.use(
    new SteamStrategy(
      {
        returnURL: returnURLString,
        realm: realmString,
        apiKey: keys.steamAPIKey,
      },
      async (identifier, profile, done) => {
        const newUser = {
          provider: "steam",
          steamID: profile.id,
          displayName: profile.displayName,
          image: profile.photos[2],
          visibility: "public",
          created: new Date(),
        };

        let foundUser;
        try {
          foundUser = await USERS.find({
            steamID: { $exists: true },
            steamID: profile.id,
          }).toArray();

          if (foundUser.length > 0) {
            if (foundUser[0].displayName !== profile.displayName) {
              const updatedUser = await USERS.findOneAndUpdate(
                { steamID: profile.id },
                { $set: { displayName: profile.displayName } },
                { returnOriginal: false }
              );
              foundUser[0] = updatedUser.value;
            }
            if (foundUser[0].image.value !== profile.photos[2].value) {
              updatedUser = await USERS.findOneAndUpdate(
                { steamID: profile.id },
                { $set: { image: profile.photos[2] } },
                { returnOriginal: false }
              );
              foundUser[0] = updatedUser.value;
            }
            return done(null, foundUser);
          } else {
            try {
              const userData = await USERS.insertOne(newUser);
              return done(null, [userData.ops[0]]);
            } catch (insertErr) {
              console.error(`Failed to create steam user.${insertErr}`);
              return done(null, null);
            }
          }
        } catch (findErr) {
          console.error(findErr);
        }
      }
    )
  );

  passport.use(
    "local-register",
    new LocalStrategy(async (username, password, done) => {
      try {
        const foundUser = await USERS.find({
          username: { $regex: `^${username}$`, $options: "im" },
        }).count();

        if (foundUser > 0) {
          return done("Username already exists.", null);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userObject = {
          provider: "local",
          displayName: username,
          email: null,
          username,
          password: hashedPassword,
          image: {
            value: null,
          },
          visibility: "public",
          created: new Date(),
        };

        const createdUser = await USERS.insertOne(userObject);

        const filteredUserObject = createdUser.ops[0];
        delete filteredUserObject.password;
        return done(null, [filteredUserObject]);
      } catch (error) {
        return done(`Failed to create user. ${error.message}`, null);
      }
    })
  );

  passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      try {
        const foundUser = await USERS.find({
          username: { $regex: `^${username}$`, $options: "im" },
        }).toArray();

        if (foundUser.length <= 0) {
          return done("Username does not exist.", null);
        }

        const foundUserData = foundUser[0];

        const isMatch = await bcrypt.compare(password, foundUserData.password);

        if (!isMatch) {
          return done("Password is incorrect.", null);
        }
        const userObject = foundUser[0];
        delete userObject.password;
        return done(null, [userObject]);
      } catch (error) {
        return done(`Failed to login. ${error.message}`, null);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
};
