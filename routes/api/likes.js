const express = require("express");
const router = express.Router();
const passport = require('passport');

const Like = require('../../models/Like');

//route to create like on a collection
router.post('/collection/:collectionId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newLike = new Like({
      parentCollection: req.params.collectionId,
      user: req.user.id
    });

    newLike.save()
      .then(like => res.json(like));
  }
);

//route to get all likes on a collection
router.get('/collection/:collectionId',
  (req, res) => {
    Like
      .find({ parentCollection: req.params.collectionId })
      .then(likes => res.json(likes))
      .catch(err => res.status(400).json(err));
  });

//route to delete like from a collection
router.delete('/:likeId',
  (req, res) => {
    Like
      .deleteMany({ _id: req.params.likeId })
      .then(like => res.json(like))
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
