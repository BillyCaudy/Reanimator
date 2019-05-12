const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../../models/User');

//test route for users
router.get("/test", (req, res) => {
  res.json({ msg: "USERS TEST ROUTE" });
});

//sign up route for users
router.post('/signup', (req, res) => {
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
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//sign in route for users
router.post('/signin', (req, res) => {
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
            res.json({ msg: "Success" });
          } else {
            return res.status(400).json({ password: "Incorrect password" });
          }
        });
    });
});

module.exports = router;
