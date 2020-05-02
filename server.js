const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Initializing routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//Config db
const db = require("./config/keys").mongoURI;

//Connect to db
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

//Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Connection establishment
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up & running on port ${port}`));
