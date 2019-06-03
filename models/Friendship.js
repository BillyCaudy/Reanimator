const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendshipSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Friendship = mongoose.model('friendships', FriendshipSchema);
