const express = require("express");
const router = express.Router();

const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const validateSignUpInput = require('../../validation/signup');
const validateSignInInput = require('../../validation/signin');
const User = require('../../models/User');
const Friendship = require("../../models/Friendship");

//authentication route
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

//sign up route for users
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "A user already exists with this email" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );

              const friendship = new Friendship({
                userId: user.id
              });
              friendship.save();
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//sign in route for users
router.post('/signin', (req, res) => {
  const { errors, isValid } = validateSignInInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ email: "This user doesn't exist" });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            return res.status(400).json({ password: "Incorrect password" });
          }
        });
    });
});

router.get("/:userId", (request, response) => {
  User.findById(request.params.userId).then(user => {
    response.send(user);
  }).catch(() => response.send("User not found"));
});

router.get("/:userId/collections/:collectionId", (request, response) => {
  const targetId = request.params.collectionId;

  User.findById(request.params.userId).populate("collections")
    .then(user => {
      let targetColl = user.collections.filter(coll => coll.id === targetId);
      if (!targetColl.length) {
        response.send("User does not have this collection");
      }
      response.json(targetColl);
    });
});

module.exports = router;
