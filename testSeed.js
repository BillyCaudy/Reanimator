const bcrypt = require("bcryptjs");

//database connection
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://dev:HYk3Xlw8P2NgsNOA@cluster0-x4fhb.mongodb.net/reanimator?retryWrites=true",
  { useNewUrlParser: true }
);

//user model and seed data
const User = require("./models/User");
const users = [
  new User({
    name: "Bob",
    email: "bob@reanimator.com",
    password: "password",
    avatarUrl: "seed1"
  }),
  new User({
    name: "Tom",
    email: "tom@reanimator.com",
    password: "password",
    avatarUrl: "seed1"
  }),
  new User({
    name: "Jeff",
    email: "seed1@reanimator.com",
    password: "password",
    avatarUrl: "seed1"
  })
];

//loop to save seed data into db
let counter = 0;
for (let i = 0; i < users.length; i++) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(users[i].password, salt, (err, hash) => {
      users[i].password = hash;

      users[i].save((err, result) => {
        counter++;
        console.log(result);
        if (counter === users.length) {
          mongoose.disconnect();
        }
      });
    });
  });
}
