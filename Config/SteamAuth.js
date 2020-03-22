const SteamStrategy = require("passport-steam").Strategy;
const mongoose = require("mongoose");
const keys = require("./default.json");
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const USERS = db.collection("Users");

module.exports = function(passport) {
  passport.use(
    new SteamStrategy(
      {
        returnURL: "http://localhost:3443/api/auth/steam/return",
        realm: "http://localhost:3443/",
        apiKey: keys.steamAPIKey
      },
      async (identifier, profile, done) => {
        const newUser = {
          provider: "steam",
          steamID: profile.id,
          displayName: profile.displayName,
          image: profile.photos[2],
          visibility: "public"
        };

        let userCount;
        try {
          userCount = await USERS.find({
            steamID: { $exists: true },
            steamID: profile.id
          }).count();
        } catch (findErr) {
          console.error(err);
        }

        if (userCount > 0) {
          done(null, profile);
        } else {
          try {
            await USERS.insertOne(newUser);
            done(null, profile);
          } catch (insertErr) {
            console.error(`Failed to create steam user.${insertErr}`);
            done(null, profile);
          }
        }
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
};
