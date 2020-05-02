const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

router.get("/test", (req, res) => res.json({ msg: "User works" }));

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already in use" });
      } else {
        const avatar = gravatar.url(email, {
          s: "200", //Size
          r: "pg", //Rating
          d: "mm", //default
        });

        const user = new User({
          name,
          email,
          password,
          avatar,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((user) => res.send(user))
              .catch((err) => conso.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err.message));
});

module.exports = router;
