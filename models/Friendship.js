const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendshipSchema = new Schema({
  followerId: {
    type: Number,
    required: true
  },
  followeeId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Friendship = mongoose.model('friendships', FriendshipSchema);
