const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "friendships TEST ROUTE" }));

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
