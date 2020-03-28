const startupServer = async () => {
  const db = require("./Shared/MongoUtil");

  /* Connect to mongoDB */
  const connectToDatabase = async () => {
    const connectResponse = await db.connect();

    if (connectResponse.res === "error") {
      console.error(`Failed to connect to database. ${connectResponse.data}`);
    }
    console.log(connectResponse.data);
  };

  await connectToDatabase();

  const express = require("express");
  const app = express();
  const passport = require("passport");
  const session = require("express-session");
  await require("./Config/SteamAuth")(passport);

  const homePageRoutes = require("./routes/home");
  const buildPageRoutes = require("./routes/builds");
  const authRoutes = require("./routes/auth");
  const userRoutes = require("./routes/users");

  // Middleware
  app.use(express.json({ extended: false }));

  // Passport Middleware
  let timeoutInHours = 3;
  timeoutInHours = 1000 * 60 * 60 * timeoutInHours;
  app.use(
    session({
      secret: "my secret",
      name: "name of session id",
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: timeoutInHours } // ms * seconds * minutes * hours
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Set global vars
  app.use((req, res, next) => {
    //make a global variable called user which request the current user
    res.locals.user = req.user || null;
    next();
  });

  // Routes
  app.get("/", (req, res) => {
    res.send("Hmm... Nothing exists here.");
  });

  app.use("/api/home", homePageRoutes);
  app.use("/api/builds", buildPageRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);

  const PORT = process.env.PORT || 3443;

  app.listen(PORT, console.log(`Server started on port: 3443`));
};

startupServer();
