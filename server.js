const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const { mongoURI } = require("./Config/default.json");

const app = express();

const homePageRoutes = require("./routes/home");

// Middleware
app.use(express.json({ extended: false }));

/* Connect to mongoDB */
let db;
const connectToDatabase = async () => {
  try {
    const dbConnection = await MongoClient.connect(mongoURI, {
      useUnifiedTopology: true
    });
    db = dbConnection.db("WolcenHQ-Development");
    console.log("Connected to MongoDB");
    const insertBuild = await db
      .collection("Builds")
      .insertOne({ name: "Jas", build: "sucks" });
    console.log(insertBuild.result);
  } catch (err) {
    console.error(`Failed to connect to MongoDB.${err}`);
  }
};

connectToDatabase();

// Routes
app.get("/", (req, res) => {
  res.send("Hmm... Nothing exists here.");
});

app.use("/api/home", homePageRoutes);

const PORT = process.env.PORT || 3443;

app.listen(PORT, console.log(`Server started on port: 3443`));
