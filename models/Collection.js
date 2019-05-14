const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'images'
  }],
  title: {
    type: String,
    required: false
  },
  notificationFrequency: {
    type: Number,
    required: false
  },
  animationSpeed: {
    type: Number,
    required: true,
    default: 0.1
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  hidden: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Collection = mongoose.model('collections', CollectionSchema);
