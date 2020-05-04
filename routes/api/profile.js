const express = require("express");
const router = express.Router();
const Profile = require("../../models/profile");
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//Get profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.profile = "Profile does not exist for this user";
          return res.status(404).json(errors);
        }
        res.send(profile);
      })
      .catch((err) => console.log(err));
  }
);

//Register profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.linkedin) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: profileFields.user }).then((profile) => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: profileFields.user },
          { $set: profileFields },
          { new: true }
        ).then((profile) => {
          res.json(profile);
        });
      } else {
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "This handle is already in use";
            res.status(400).json(errors);
          } else {
            const newProfile = new Profile(profileFields);
            newProfile
              .save()
              .then((profile) => {
                res.json(profile);
              })
              .catch((err) => console.log(err));
          }
        });
      }
    });
  }
);

module.exports = router;
