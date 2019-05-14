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

function seedEverything(req, res) {

  /* USER SEEDING */
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
      password: "password", avatarUrl: "seed3"
    }
  ];

  User.deleteMany({}, () => {
    for (let user of users) {
      let newUser = new User(user);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
        });
      });
    }
  });

  /* COLLECTION SEEDING */
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

  Collection.deleteMany({}, () => {
    for (let coll of collections) {
      let newCollection = new Collection(coll);
      newCollection.save();
    }
  });

  res.json({ message: 'done seeding' });
}
