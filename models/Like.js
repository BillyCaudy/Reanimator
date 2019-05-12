const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  collectionId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Like = mongoose.model('likes', LikeSchema);
