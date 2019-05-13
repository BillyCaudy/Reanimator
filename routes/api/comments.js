const express = require("express");
const router = express.Router();
const passport = require('passport');

const Comment = require('../../models/Comment');
const validateCommentInput = require('../../validation/comments');

//route to create a comment
router.post('/',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateCommentInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newComment = new Comment({
      author: req.user.id,
      bodyText: req.body.bodyText
    });

    newComment.save()
      .then(comment => res.json(comment));
  }
);

//route to get all comments
router.get('/', (req, res) => {
  Comment
    .find().sort({ date: -1 })
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json(err));
});

//route to get all comments from particular user
router.get('/user/:user_id', (req, res) => {
  Comment
    .find({ author: req.params.user_id }).sort({ date: -1 })
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
