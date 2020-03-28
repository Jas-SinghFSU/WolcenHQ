const SteamStrategy = require("passport-steam").Strategy;
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

        let foundUser;
        try {
          foundUser = await USERS.find({
            steamID: { $exists: true },
            steamID: profile.id
          }).toArray();
        } catch (findErr) {
          console.error(err);
        }

        if (foundUser.length > 0) {
          return done(null, foundUser);
        } else {
          try {
            const userData = await USERS.insertOne(newUser);
            return done(null, userData.ops[0]);
          } catch (insertErr) {
            console.error(`Failed to create steam user.${insertErr}`);
            return done(null, null);
          }
        }
      }
    )
  );

  passport.serializeUser(function(user, done) {
    // console.log(`user is ${JSON.stringify(user)}`);
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
};
