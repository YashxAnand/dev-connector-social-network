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

    newPost.save().then(post => res.json(post));
  }
);

//Get all the posts
router.get("/", (req, res) => {
  const errors = {};

  Posts.find()
    .sort({ date: -1 })
    .then(posts => {
      if (!posts) {
        errors.posts = "No posts found";
        return res.status(404).json(errors);
      }

      res.send(posts);
    });
});

//Get all the post by id
router.get("/:id", (req, res) => {
  const errors = {};

  Posts.findById(req.params.id)
    .then(post => {
      if (!post) {
        errors.post = "No posts found";
        return res.status(404).json(errors);
      }

      res.send(post);
    })
    .catch(err => console.log(err));
});

//Delete a post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById({ _id: req.params.id })
      .then(post => {
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ unauthorized: "User not authorized to delete post" });
        }

        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => console.log(err));
  }
);

//Like a post
//@route /api/posts/like/:id
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById({ _id: req.params.id })
      .then(post => {
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.json({
            alreadyliked: "Users have already liked this post",
          });
        }

        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      })
      .catch(err => console.log(err));
  }
);

//Unlike a post
//@route /api/posts/unlike/:id
router.delete(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res.json({ notliked: "User have not liked this post" });
        }

        const removeIndex = post.likes
          .map(like => like.user)
          .indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        post
          .save()
          .then(post => res.json(post))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

//Add a comment
//@route /api/posts/comment/:id
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Posts.findOne({ _id: req.params.id })
      .then(post => {
        if (!post) {
          return res.status(404).json({ nopost: "No post found" });
        }

        const newComment = {
          user: req.user.id,
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar,
        };

        post.comments.unshift(newComment);
        post
          .save()
          .then(post => res.json(post))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

//Delete a comment
// @route /api/posts/comment/:post_id/:comment_id
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        if (
          post.comments.filter(
            comment => comment.user.toString() === req.user.id
          ).length === 0
        ) {
          return res.json({ nocomment: "User does not have any comment" });
        }

        const removeIndex = post.comments
          .map(item => item._id)
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post
          .save()
          .then(post => res.json(post))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
