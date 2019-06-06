const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");

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
  });

module.exports = router;
