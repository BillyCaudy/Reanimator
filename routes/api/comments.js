const express = require("express");
const router = express.Router();
const passport = require('passport');

const Comment = require('../../models/Comment');
const validateCommentInput = require('../../validation/comments');

router.get("/test", (req, res) => res.json({ msg: "COMMENTS TEST ROUTE" }));

router.post('/',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newComment = new Comment({
      user: req.user.id,
      bodyText: req.body.bodyText
    });

    newComment.save()
      .then(comment => res.json(comment));
  }
);

module.exports = router;
