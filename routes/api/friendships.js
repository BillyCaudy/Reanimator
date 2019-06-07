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

/* verified */
//route to start following someone
router.post("/following/:userId",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Friendship
      .where("userId", request.user.id)
      .then(obj => {
        obj[0].following.push(request.params.userId);
        obj[0].save().then(() => response.json({ msg: "User friended" }));
      });
  }
);

/* verified */
//route to unfollow a user
router.delete("/following/:userId",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Friendship
      .where("userId", request.user.id)
      .then(obj => {
        let idx = obj[0].following.indexOf(request.params.userId);
        obj[0].following.splice(idx, 1);
        obj[0].save().then(() => response.json({ msg: "User unfriended" }));
      });
  }
);

module.exports = router;
