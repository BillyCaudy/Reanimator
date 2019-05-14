const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  collections: [{
    type: Schema.Types.ObjectId,
    ref: "collections"
  }],
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
