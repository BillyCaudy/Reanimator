const User = require('../../models/User');
const Friendship = require('../../models/Friendship');
const Collection = require('../../models/Collection');
const Image = require('../../models/Image');
const Comment = require('../../models/Comment');
const Like = require('../../models/Like');

const bcrypt = require('bcryptjs');

module.exports = {
  seedEverything: seedEverything
};

const users = [
  {
    name: "Seeded User 1",
    email: "seed1@reanimator.com",
    password: "password",
    avatarUrl: "seed1"
  },
  {
    name: "Seeded User 2",
    email: "seed2@reanimator.com",
    password: "password",
    avatarUrl: "seed2"
  },
  {
    name: "Seeded User 3",
    email: "seed3@reanimator.com",
    password: "password",
    avatarUrl: "seed3"
  }
];

const collections = [
  {
    title: "Seed User 1 Title",
    notificationFrequency: 3600,
    animationSpeed: 0.05
  },
  {
    title: "Seed User 2 Title",
    notificationFrequency: 3600,
    animationSpeed: 0.05
  },
  {
    title: "Seed User 3 Title",
    notificationFrequency: 3600,
    animationSpeed: 0.05
  }
];

function seedEverything(req, res) {
  let userIds = [];
  let userDocs = [];
  let collectionIds = [];
  let friendshipIds = [];
  let friendshipDocs = [];

  User.deleteMany({}, () => {
    for (let user of users) {
      let newUser = new User(user);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
          userDocs.push(newUser);
          userIds.push(newUser.id);
        });
      });
    }
  }).then(() => {
    Collection.deleteMany({}, () => {
      for (let i = 0; i < collections.length; i++) {
        let newCollection = new Collection(collections[i]);

        newCollection.owner = userIds[i];
        newCollection.save().then(() => {
          collectionIds.push(newCollection.id);
          userDocs[i].collections.push(collectionIds[i]);
        });
      }
    });
  }).then(() => {
    Friendship.deleteMany({}, () => {
      for (let i = 0; i < userDocs.length; i++) {
        let friendship = new Friendship({
          userId: userDocs[i].id
        });
        userIds.forEach(id => {
          if (id !== userDocs[i].id) {
            friendship.following.push(id);
            friendship.followers.push(id);
          }
        });
        friendship.save().then(() => {
          friendshipDocs.push(friendship);
          userDocs[i].friends = friendship.id;
          userDocs[i].save();
        });
      }
    });
    res.send("complete");
  });
}
