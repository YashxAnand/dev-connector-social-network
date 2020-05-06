const express = require("express");
const router = express.Router();
const passport = require("passport");
const Posts = require("../../models/Posts");
const validatePostInput = require("../../validation/posts");

router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

//Create a post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Posts({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id,
    });

    newPost.save().then((post) => res.json(post));
  }
);

module.exports = router;
