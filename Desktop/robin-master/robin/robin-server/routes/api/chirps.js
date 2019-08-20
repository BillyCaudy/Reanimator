const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateChirpInput = require("../../validations/chirps");
const Chirp = require("../../models/Chirp");
router.get("/test", (req, res) =>
  res.json({ msg: "This is the chirps route" })
);

router.get("/", (req, res) => {
  Chirp.find()
    .sort({ date: -1 })
    .then(chirps => res.json(chirps))
    .catch(err => res.status(404).json({ nochirpsfound: "No chirps found" }));
});

router.get("/user/:user_id", (req, res) => {
  Chirp.find({ user: req.params.user_id })
    .sort({ date: -1 })
    .then(chirps => res.json(chirps))
    .catch(err =>
      res.status(404).json({ nochirpsfound: "No chirps found from that user" })
    );
});

router.get("/:id", (req, res) => {
  Chirp.findById(req.params.id)
    .then(chirp => res.json(chirp))
    .catch(err =>
      res.status(404).json({ nochirpfound: "No chirp found with that ID" })
    );
});

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChirpInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newChirp = new Chirp({
      body: req.body.body,
      user: req.user.id
    });

    newChirp.save().then(chirp => res.json(chirp));
  }
);

module.exports = router;
