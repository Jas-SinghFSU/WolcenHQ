const express = require("express");

const app = express();

const homePageRoutes = require("./routes/home");

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.send("Hmm... Nothing exists here.");
});

app.use("/api/home", homePageRoutes);

const PORT = process.env.PORT || 3443;

app.listen(PORT, console.log(`Server started on port: 3443`));
