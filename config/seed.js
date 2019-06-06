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

const Friendship = require("../models/Friendship");
let friendships = [];

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

const Image = require("../models/Image");
let images1 = [];
for (let i = 0; i < 20; i++) {
  images1.push(
    new Image({
      imgName: `Image #${i}`,
      imgUrl: `image.url${i}`
    })
  );
}
let images2 = [];
for (let i = 0; i < 20; i++) {
  images2.push(
    new Image({
      imgName: `Image #${i}`,
      imgUrl: `image.url${i}`
    })
  );
}
let images3 = [];
for (let i = 0; i < 20; i++) {
  images3.push(
    new Image({
      imgName: `Image #${i}`,
      imgUrl: `image.url${i}`
    })
  );
}

const Comment = require("../models/Comment");
const comments = [
  new Comment({ bodyText: "Amazing photos" }),
  new Comment({ bodyText: "Keep posting" }),
  new Comment({ bodyText: "Hey, follow me 4 a follow back" }),
  new Comment({ bodyText: "Hit the ground running" }),
  new Comment({ bodyText: "Hai" }),
  new Comment({ bodyText: "This app is cool" })
];

const Like = require("../models/Like");
let likes = [];

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
  }
  console.log("Users created");

  await Collection.deleteMany({});
  console.log("Collections purged");
  for (let i = 0; i < collections.length; i++) {
    await collections[i].save();
  }
  console.log("Collections created");

  for (let i = 0; i < users.length; i++) {
    users[i].collections.push(collections[i].id);
    await users[i].save();

    collections[i].owner = users[i].id;
    await collections[i].save();
  }
  console.log("Users/Collections connected");

  await Image.deleteMany({});
  for (let i = 0; i < images1.length; i++) {
    images1[i].parentCollection = collections[0].id;
    await images1[i].save();
    images2[i].parentCollection = collections[1].id;
    await images2[i].save();
    images3[i].parentCollection = collections[2].id;
    await images3[i].save();
  }
  console.log("Images created");

  for (let i = 0; i < images1.length; i++) {
    collections[0].images.push(images1[i].id);
    collections[1].images.push(images2[i].id);
    collections[2].images.push(images3[i].id);
  }
  await collections[0].save();
  await collections[1].save();
  await collections[2].save();
  console.log("20 images added to each collection");

  await Friendship.deleteMany({});
  for (let i = 0; i < users.length; i++) {
    let association = new Friendship({
      userId: users[i].id
    });
    friendships.push(association);
    for (let j = 0; j < users.length; j++) {
      if (i !== j) {
        association.followers.push(users[j].id);
        association.following.push(users[j].id);
      }
    }
    await association.save();
  }
  console.log("Friendships created");

  await Comment.deleteMany({});
  for (let i = 0; i < comments.length; i++) {
    let coll = collections[i % collections.length];
    comments[i].author = users[i % users.length].id;
    comments[i].parentCollection = coll.id;
    await comments[i].save();

    coll.comments.push(comments[i].id);
  }
  for (let i = 0; i < collections.length; i++) {
    await collections[i].save();
  }
  console.log("Comments created");

  await Like.deleteMany({});
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < collections.length; j++) {
      let randNo = Math.floor(Math.random() * 100 + 1);
      if (randNo > 30) {
        likes.push(
          new Like({
            parentCollection: collections[j].id,
            user: users[i].id
          })
        );
      }
    }
  }
  for (let i = 0; i < likes.length; i++) {
    await likes[i].save();
    let coll = await Collection.findById(likes[i].parentCollection);
    coll.likes.push(likes[i].id);
    await coll.save();
  }
  console.log("Likes randomly generated");

  mongoose.disconnect();
}

startSeed();
