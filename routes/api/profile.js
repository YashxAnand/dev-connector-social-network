const express = require("express");
const router = express.Router();
const Profile = require("../../models/profile");
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//Get profile
//@route /api/profile/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.profile = "Profile does not exist for this user";
          return res.status(404).json(errors);
        }
        res.send(profile);
      })
      .catch(err => console.log(err));
  }
);

//Get profile by handle
//@route /api/profile/handle/:handle
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile found";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

//Get profile by id
//@route /api/profile/user/:id
router.get("/user/:id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile found";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(400).json({ profile: "There is no profile for this user" })
    );
});

//Get all profiles
//@route /api/profile/all
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.profile("There are no profiles");
        return res.json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.json(err));
});

//Register profile
//@route /api/profile
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
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: profileFields.user }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: profileFields.user },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "This handle is already in use";
            res.status(400).json(errors);
          } else {
            const newProfile = new Profile(profileFields);
            newProfile
              .save()
              .then(profile => {
                res.json(profile);
              })
              .catch(err => console.log(err));
          }
        });
      }
    });
  }
);

//Add a new experience
//@route /api/profile/experience
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.profile = "Profile not found";
          return res.json(errors);
        }

        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };

        profile.experience.unshift(newExp);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => console.log(err));
  }
);

//Add a new education
//@route /api/profile/education
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.profile = "Profile not found";
          return res.json(errors);
        }

        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };

        profile.education.unshift(newEdu);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => console.log(err));
  }
);

//route api/profile/experience/:exp_id

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.profile = "Profile not found";
        return res.status(404).json(errors);
      }

      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    });
  }
);
//route api/profile/education/:exp_id

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.profile = "Profile not found";
        return res.status(404).json(errors);
      }

      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//Delete user and profile

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ msg: "Success" });
      });
    });
  }
);

module.exports = router;
