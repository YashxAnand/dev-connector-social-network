const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

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

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ password: "Password incorrect" });
      }

      const { id, name, avatar } = user;
      const payload = {
        id,
        name,
        avatar,
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 36000 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, email, id, avatar } = req.user;

    res.json({
      id,
      name,
      email,
      avatar,
    });
  }
);

module.exports = router;
