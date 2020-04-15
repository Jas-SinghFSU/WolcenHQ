const SteamStrategy = require("passport-steam").Strategy;
const keys = require("./default.json");
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const USERS = db.collection("Users");

module.exports = function (passport) {
  passport.use(
    new SteamStrategy(
      {
        returnURL: "http://localhost:3443/api/auth/steam/return",
        realm: "http://localhost:3443/",
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
              return done(null, userData.ops[0]);
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

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
};
