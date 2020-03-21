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

  const homePageRoutes = require("./routes/home");
  const buildPageRoutes = require("./routes/builds");

  // Middleware
  app.use(express.json({ extended: false }));

  // Routes
  app.get("/", (req, res) => {
    res.send("Hmm... Nothing exists here.");
  });

  app.use("/api/home", homePageRoutes);
  app.use("/api/builds", buildPageRoutes);

  const PORT = process.env.PORT || 3443;

  app.listen(PORT, console.log(`Server started on port: 3443`));
};

startupServer();
