const bcrypt = require("bcryptjs");

//database connection
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://dev:HYk3Xlw8P2NgsNOA@cluster0-x4fhb.mongodb.net/reanimator?retryWrites=true",
  { useNewUrlParser: true }
);

const User = require("../models/User");
const users = [
  new User({
    name: "User 1",
    email: "user1@reanimator.com",
    password: "password",
    avatarUrl: "user1"
  }),
  new User({
    name: "User 2",
    email: "user2@reanimator.com",
    password: "password",
    avatarUrl: "user2"
  }),
  new User({
    name: "User 3",
    email: "user3@reanimator.com",
    password: "password",
    avatarUrl: "user3"
  })
];

const Collection = require("../models/Collection");
const collections = [
  new Collection({
    title: "Collection 1",
    notificationFrequency: 1000,
    animationSpeed: 0.1
  }),
  new Collection({
    title: "Collection 2",
    notificationFrequency: 2000,
    animationSpeed: 0.02
  }),
  new Collection({
    title: "Collection 3",
    notificationFrequency: 300,
    animationSpeed: 0.333
  }),
];

async function startSeed() {
  await User.deleteMany({});
  console.log("Users purged");
  for (let i = 0; i < users.length; i++) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(users[i].password, salt, (err, hash) => {
        users[i].password = hash;
      });
    });
    await users[i].save();
    console.log(users[i].name);
  }

  await Collection.deleteMany({});
  console.log("Collections purged");
  for (let i = 0; i < collections.length; i++) {
    await collections[i].save();
    console.log(collections[i].title);
  }

  mongoose.disconnect();
}

startSeed();
