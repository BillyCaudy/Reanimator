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
  }
);

router.get("/followers",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    response.json({
      obj: request.user
    });
  }
);

module.exports = router;

router.get('/current', passport.authenticate(
  'jwt',
  { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
