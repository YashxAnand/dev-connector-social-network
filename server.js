const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

//Create a body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Initializing routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//Config db
const db = require("./config/keys").mongoURI;

//Connect to db
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Config passport
app.use(passport.initialize());

require("./config/passport")(passport);

//Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Connection establishment
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up & running on port ${port}`));
