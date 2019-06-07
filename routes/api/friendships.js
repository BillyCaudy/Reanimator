const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");
const Friendship = require("../../models/Friendship");

/* verified */
//route to get collections from a friend
router.get("/:friendId/collections",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const friendId = request.params.friendId;

    User.findById(friendId)
      .populate("collections")
      .then(user => {
        if (!user.collections.length) response.send("User has no collections");
        response.json(user.collections);
      });
  }
);

/* verified */
//route that gets all of your followers
router.get("/followers",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {

    Friendship
      .where("userId", request.user.id)
      .populate("followers")
      .then(obj => {
        response.json({ followers: obj[0].followers });
      });
  }
);

/* verified */
//route that gets all of your followers
router.get("/following",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {

    Friendship
      .where("userId", request.user.id)
      .populate("following")
      .then(obj => {
        response.json({ following: obj[0].following });
      });
  }
);

module.exports = router;
