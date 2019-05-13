const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  parentCollection: {
    type: Schema.Types.ObjectId,
    ref: 'collections',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Like = mongoose.model('likes', LikeSchema);
