const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  parentCollection: {
    type: Schema.Types.ObjectId,
    ref: 'collections',
    required: true
  },
  bodyText: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model('comments', CommentSchema);
